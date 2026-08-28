const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    date: {
        type: Date,
        required: true,
        index: true
    },
    startTime: String,
    endTime: String,
    location: {
        type: String,
        default: 'आश्रम परिसर'
    },
    category: {
        type: String,
        enum: ['yoga', 'meditation', 'bhajan', 'seminar', 'pooja', 'other'],
        default: 'other'
    },
    capacity: Number,
    registeredCount: {
        type: Number,
        default: 0
    },
    registeredParticipants: [
        {
            name: String,
            email: String,
            phone: String,
            registeredAt: { type: Date, default: Date.now }
        }
    ],
    image: String,
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
