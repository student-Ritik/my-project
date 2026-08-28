const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// POST - Submit contact form
router.post('/', [
    body('name').trim().notEmpty().withMessage('नाम आवश्यक है'),
    body('email').isEmail().withMessage('कृपया वैध ईमेल दर्ज करें'),
    body('message').trim().notEmpty().withMessage('संदेश आवश्यक है')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, subject, message } = req.body;
        const database = req.database;

        // Create contact object
        const contact = {
            _id: Date.now().toString(),
            name,
            email,
            phone,
            subject,
            message,
            status: 'new',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Save to in-memory database
        database.contacts.push(contact);

        console.log(`📬 New contact message from ${name}: ${email}`);

        res.status(201).json({
            success: true,
            message: 'आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।',
            contactId: contact._id
        });

    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ 
            error: 'संदेश भेजने में त्रुटि हुई। कृपया बाद में कोशिश करें।'
        });
    }
});

// GET - Retrieve all messages (Admin only)
router.get('/messages', async (req, res) => {
    try {
        const database = req.database;
        const messages = database.contacts.sort((a, b) => b.createdAt - a.createdAt).slice(0, 100);
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'संदेश प्राप्त करने में त्रुटि' });
    }
});

// GET - Get specific message
router.get('/:id', async (req, res) => {
    try {
        const database = req.database;
        const contact = database.contacts.find(c => c._id === req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'संदेश नहीं मिला' });
        }
        contact.status = 'read';
        res.json({ contact });
    } catch (error) {
        res.status(500).json({ error: 'त्रुटि' });
    }
});

// PUT - Update message status
router.put('/:id/status', async (req, res) => {
    try {
        const database = req.database;
        const { status } = req.body;
        const contact = database.contacts.find(c => c._id === req.params.id);
        if (contact) {
            contact.status = status;
            contact.updatedAt = new Date();
        }
        res.json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ error: 'स्थिति अपडेट करने में त्रुटि' });
    }
});

// DELETE - Delete a message
router.delete('/:id', async (req, res) => {
    try {
        const database = req.database;
        const index = database.contacts.findIndex(c => c._id === req.params.id);
        if (index > -1) {
            database.contacts.splice(index, 1);
        }
        res.json({ success: true, message: 'संदेश हटा दिया गया' });
    } catch (error) {
        res.status(500).json({ error: 'हटाने में त्रुटि' });
    }
});

module.exports = router;
