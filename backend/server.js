const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.log('MongoDB URI not set. Running without database for now.');
}

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve frontend files from the project root
app.use(express.static(path.join(__dirname, '..')));

// Home route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Test route
app.get('/api/health', function(req, res) {
  res.json({
    message: 'India Travel Portal API Running! 🚀',
    status: 'success'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Server chal raha hai port ${PORT} pe! 🔥`);
});