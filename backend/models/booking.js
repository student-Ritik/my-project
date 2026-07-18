const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  checkin: {
    type: String,
    required: true
  },
  checkout: {
    type: String,
    required: true
  },
  guests: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);