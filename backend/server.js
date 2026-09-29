const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const database = require('./db');
const { isAdminAuthenticated, requireAdminAuth } = require('./middleware/adminAuth');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make database available to routes
app.use((req, res, next) => {
    req.database = database;
    next();
});

// Admin authentication and protected routes
app.use('/api/admin/auth', require('./routes/adminAuth'));
app.use('/api/admin', requireAdminAuth, require('./routes/admin'));
app.use('/api/newsletter/admin', requireAdminAuth);
app.use('/api/events/admin', requireAdminAuth);
app.use('/api/contact/messages', requireAdminAuth);
app.use('/api/contact/:id', requireAdminAuth);

// Require a login for all website data and form APIs.
app.use('/api/contact', requireAdminAuth, require('./routes/contact'));
app.use('/api/newsletter', requireAdminAuth, require('./routes/newsletter'));
app.use('/api/programs', requireAdminAuth, require('./routes/programs'));
app.use('/api/events', requireAdminAuth, require('./routes/events'));

// Require an authenticated session before serving the dashboard HTML.
const projectDirectory = path.join(__dirname, '..');
const adminDirectory = path.join(projectDirectory, 'admin');
app.get(['/admin', '/admin/', '/admin/index.html'], (req, res) => {
    if (!isAdminAuthenticated(req)) {
        return res.redirect('/admin/login.html');
    }
    res.sendFile(path.join(adminDirectory, 'index.html'));
});
app.use('/admin', express.static(adminDirectory, { index: false }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running ✅', 
        timestamp: new Date(),
        database: 'In-Memory (Testing Mode)',
        stats: {
            contacts: database.contacts.length,
            newsletters: database.newsletter.length,
            events: database.events.length
        }
    });
});

// Serve only the public website files, not the backend source tree.
const publicFiles = {
    '/styles.css': 'styles.css',
    '/script.js': 'script.js',
    '/config.js': 'config.js',
    '/manifest.json': 'manifest.json',
    '/sw.js': 'sw.js',
    '/icon.svg': 'icon.svg',
    '/icon-192.png': 'icon-192.png',
    '/icon-512.png': 'icon-512.png',
    '/robots.txt': 'robots.txt',
    '/sitemap.xml': 'sitemap.xml',
    '/aasram.jpeg': 'aasram.jpeg',
    '/as2.jpeg': 'as2.jpeg',
    '/baba.jpeg': 'baba.jpeg',
    '/A.png': 'A.png',
    '/B.png': 'B.png',
    '/C.png': 'C.png',
    '/D.png': 'D.png',
    '/E.png': 'E.png',
    '/F.png': 'F.png',
    '/G.png': 'G.png'
};

function serveWebsite(req, res) {
    if (!isAdminAuthenticated(req)) {
        return res.redirect('/admin/login.html');
    }

    res.sendFile(path.join(projectDirectory, 'index.html'));
}
app.get('/', serveWebsite);
app.get('/index.html', serveWebsite);
app.get(Object.keys(publicFiles), (req, res, next) => {
    res.sendFile(path.join(projectDirectory, publicFiles[req.path]), error => {
        if (error) next(error);
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({ 
        error: err.message || 'Internal server error' 
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Kabir Aasram Backend API`);
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`📍 Admin Dashboard: http://localhost:${PORT}/admin/`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`💾 Database: In-Memory (Testing Mode)`);
    console.log(`\n✅ Ready to receive requests!\n`);
});

