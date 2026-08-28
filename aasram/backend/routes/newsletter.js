const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// POST - Subscribe to newsletter
router.post('/subscribe', [
    body('email').isEmail().withMessage('कृपया वैध ईमेल दर्ज करें'),
    body('name').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name, preferences } = req.body;
        const database = req.database;

        // Check if already subscribed
        let subscriber = database.newsletter.find(s => s.email === email);
        
        if (subscriber && subscriber.status === 'subscribed') {
            return res.status(400).json({ 
                error: 'आप पहले से सदस्य हैं। धन्यवाद!'
            });
        }

        if (subscriber) {
            subscriber.status = 'subscribed';
            subscriber.subscribedAt = new Date();
            subscriber.name = name || subscriber.name;
            if (preferences) subscriber.preferences = preferences;
        } else {
            subscriber = {
                _id: Date.now().toString(),
                email,
                name,
                preferences: preferences || { yoga: true, meditation: true, events: true },
                status: 'subscribed',
                subscribedAt: new Date()
            };
            database.newsletter.push(subscriber);
        }

        console.log(`📧 New newsletter subscriber: ${email}`);

        res.status(201).json({
            success: true,
            message: 'आपकी सदस्यता सफल रही। धन्यवाद!'
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ error: 'सदस्यता में त्रुटि। कृपया बाद में कोशिश करें।' });
    }
});

// POST - Unsubscribe from newsletter
router.post('/unsubscribe', [
    body('email').isEmail().withMessage('कृपया वैध ईमेल दर्ज करें')
], async (req, res) => {
    try {
        const { email } = req.body;
        const database = req.database;
        const subscriber = database.newsletter.find(s => s.email === email);
        
        if (subscriber) {
            subscriber.status = 'unsubscribed';
            subscriber.unsubscribedAt = new Date();
        }

        res.json({ 
            success: true,
            message: 'आप सदस्यता से हटा दिए गए हैं।'
        });
    } catch (error) {
        res.status(500).json({ error: 'असबस्क्राइब करने में त्रुटि' });
    }
});

// GET - Get all subscribers (Admin only)
router.get('/admin/subscribers', async (req, res) => {
    try {
        const database = req.database;
        const subscribers = database.newsletter.filter(s => s.status === 'subscribed');
        const stats = {
            total: subscribers.length,
            yoga: subscribers.filter(s => s.preferences && s.preferences.yoga).length,
            meditation: subscribers.filter(s => s.preferences && s.preferences.meditation).length,
            events: subscribers.filter(s => s.preferences && s.preferences.events).length
        };
        res.json({ subscribers, stats });
    } catch (error) {
        res.status(500).json({ error: 'सदस्यों को प्राप्त करने में त्रुटि' });
    }
});

// POST - Send newsletter (Admin only)
router.post('/admin/send', [
    body('subject').notEmpty().withMessage('विषय आवश्यक है'),
    body('content').notEmpty().withMessage('सामग्री आवश्यक है')
], async (req, res) => {
    try {
        const { subject, content, category } = req.body;
        const database = req.database;

        let subscribers = database.newsletter.filter(s => s.status === 'subscribed');

        if (category) {
            subscribers = subscribers.filter(s => s.preferences && s.preferences[category]);
        }

        if (subscribers.length === 0) {
            return res.status(400).json({ error: 'कोई सदस्य नहीं मिले' });
        }

        // Update last email sent
        subscribers.forEach(s => {
            s.lastEmailSent = new Date();
        });

        res.json({
            success: true,
            message: `${subscribers.length} सदस्यों को न्यूजलेटर भेजा गया।`
        });

    } catch (error) {
        console.error('Newsletter send error:', error);
        res.status(500).json({ error: 'न्यूजलेटर भेजने में त्रुटि' });
    }
});

module.exports = router;
