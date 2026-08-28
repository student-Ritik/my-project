const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'ईमेल आवश्यक है'],
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'कृपया वैध ईमेल दर्ज करें']
    },
    name: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['subscribed', 'unsubscribed', 'bounced'],
        default: 'subscribed'
    },
    preferences: {
        yoga: { type: Boolean, default: true },
        meditation: { type: Boolean, default: true },
        events: { type: Boolean, default: true },
        spiritualTalks: { type: Boolean, default: true }
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: Date,
    lastEmailSent: Date
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
