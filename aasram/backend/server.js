const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const database = require('./db');

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

// Routes
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/events', require('./routes/events'));
app.use('/api/admin', require('./routes/admin'));

// Serve Admin Dashboard
app.use('/admin', express.static(path.join(__dirname, '../admin')));

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

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: '🙏 Kabir Aasram Backend API',
        version: '1.0.0',
        status: '✅ Running',
        mode: 'Testing Mode (In-Memory Database)',
        endpoints: {
            contact: '/api/contact',
            newsletter: '/api/newsletter',
            programs: '/api/programs',
            events: '/api/events',
            admin: '/api/admin',
            health: '/api/health',
            dashboard: '/admin/'
        }
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

