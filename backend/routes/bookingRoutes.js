const express = require('express');
const router = express.Router();

// Temporary storage — DB ke bina
let bookings = [];

// GET — Saari bookings lo
router.get('/', function(req, res) {
  res.json({
    message: 'Bookings fetched! ✅',
    total: bookings.length,
    bookings: bookings
  });
});

// POST — Nayi booking save karo
router.post('/create', function(req, res) {
  try {
    const { place, checkin, checkout, guests, amount } = req.body;

    if(!place || !checkin || !checkout) {
      return res.status(400).json({
        message: 'Please fill all fields! ❌'
      });
    }

    const newBooking = {
      id: 'ITP' + Math.floor(Math.random() * 90000 + 10000),
      place,
      checkin,
      checkout,
      guests,
      amount,
      status: 'Confirmed',
      date: new Date().toLocaleDateString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      message: 'Booking created! ✅',
      booking: newBooking
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error!',
      error: error.message
    });
  }
});

// GET — Stats for admin
router.get('/stats', function(req, res) {
  let totalRevenue = 0;
  bookings.forEach(function(booking) {
    const amount = parseInt(
      booking.amount.replace(/[^0-9]/g, '')
    );
    if(!isNaN(amount)) totalRevenue += amount;
  });

  res.json({
    totalBookings: bookings.length,
    totalRevenue: totalRevenue,
    bookings: bookings
  });
});

module.exports = router;