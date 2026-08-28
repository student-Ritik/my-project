const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'नाम आवश्यक है'],
        trim: true,
        minlength: [2, 'नाम कम से कम 2 अक्षर होना चाहिए']
    },
    email: {
        type: String,
        required: [true, 'ईमेल आवश्यक है'],
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'कृपया वैध ईमेल दर्ज करें']
    },
    phone: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: [true, 'संदेश आवश्यक है'],
        minlength: [5, 'संदेश कम से कम 5 अक्षर होना चाहिए']
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
