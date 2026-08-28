const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// GET - Get all upcoming events
router.get('/', async (req, res) => {
    try {
        const { category, limit = 10 } = req.query;
        const database = req.database;
        let events = database.events.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
        
        if (category) {
            events = events.filter(e => e.category === category);
        }

        events = events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, parseInt(limit));

        res.json({ events });
    } catch (error) {
        res.status(500).json({ error: 'कार्यक्रम प्राप्त करने में त्रुटि' });
    }
});

// GET - Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const database = req.database;
        const event = database.events.find(e => e._id === req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'कार्यक्रम नहीं मिला' });
        }
        res.json({ event });
    } catch (error) {
        res.status(500).json({ error: 'त्रुटि' });
    }
});

// POST - Register for event
router.post('/:id/register', [
    body('name').trim().notEmpty().withMessage('नाम आवश्यक है'),
    body('email').isEmail().withMessage('कृपया वैध ईमेल दर्ज करें'),
    body('phone').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const database = req.database;
        const event = database.events.find(e => e._id === req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'कार्यक्रम नहीं मिला' });
        }
        if (!event) {
            return res.status(404).json({ error: 'कार्यक्रम नहीं मिला' });
        }

        if (event.capacity && event.registeredCount >= event.capacity) {
            return res.status(400).json({ error: 'क्षमता भर गई है' });
        }

        const { name, email, phone } = req.body;

        // Check if already registered
        const isRegistered = event.registeredParticipants.some(p => p.email === email);
        if (isRegistered) {
            return res.status(400).json({ error: 'आप पहले से पंजीकृत हैं' });
        }

        event.registeredParticipants.push({ name, email, phone, registeredAt: new Date() });
        event.registeredCount = event.registeredParticipants.length;

        console.log(`📅 New event registration: ${name} for ${event.title}`);

        res.status(201).json({
            success: true,
            message: 'आप सफलतापूर्वक पंजीकृत हो गए हैं!'
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'पंजीकरण में त्रुटि' });
    }
});

// POST - Create event (Admin only)
router.post('/admin/create', [
    body('title').notEmpty().withMessage('शीर्षक आवश्यक है'),
    body('date').isISO8601().withMessage('वैध तारीख दर्ज करें'),
    body('category').isIn(['yoga', 'meditation', 'bhajan', 'seminar', 'pooja', 'other'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const database = req.database;
        const event = {
            _id: Date.now().toString(),
            ...req.body,
            registeredCount: 0,
            registeredParticipants: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        database.events.push(event);

        res.status(201).json({
            success: true,
            message: 'कार्यक्रम सफलतापूर्वक बनाया गया',
            event
        });
    } catch (error) {
        res.status(500).json({ error: 'कार्यक्रम बनाने में त्रुटि' });
    }
});

// PUT - Update event (Admin only)
router.put('/admin/:id', async (req, res) => {
    try {
        const database = req.database;
        const event = database.events.find(e => e._id === req.params.id);
        if (event) {
            Object.assign(event, req.body, { updatedAt: new Date() });
        }
        res.json({ success: true, event });
    } catch (error) {
        res.status(500).json({ error: 'अपडेट में त्रुटि' });
    }
});

// DELETE - Delete event (Admin only)
router.delete('/admin/:id', async (req, res) => {
    try {
        const database = req.database;
        const index = database.events.findIndex(e => e._id === req.params.id);
        if (index > -1) {
            database.events.splice(index, 1);
        }
        res.json({ success: true, message: 'कार्यक्रम हटा दिया गया' });
    } catch (error) {
        res.status(500).json({ error: 'हटाने में त्रुटि' });
    }
});

module.exports = router;
