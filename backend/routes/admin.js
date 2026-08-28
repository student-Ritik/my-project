const express = require('express');
const router = express.Router();

// Admin Dashboard - Get statistics
router.get('/dashboard', async (req, res) => {
    try {
        const database = req.database;
        const totalMessages = database.contacts.length;
        const newMessages = database.contacts.filter(c => c.status === 'new').length;
        const totalSubscribers = database.newsletter.length;
        const upcomingEvents = database.events.filter(e => e.status === 'upcoming').length;
        const totalRegistrations = database.events.reduce((sum, e) => sum + (e.registeredCount || 0), 0);

        const recentMessages = database.contacts
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 5);

        const upcomingEventsList = database.events
            .filter(e => e.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        res.json({
            statistics: {
                totalMessages,
                newMessages,
                totalSubscribers,
                upcomingEvents,
                totalRegistrations
            },
            recentMessages,
            upcomingEvents: upcomingEventsList
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'डैशबोर्ड लोड करने में त्रुटि' });
    }
});

// Get analytics
router.get('/analytics', async (req, res) => {
    try {
        const database = req.database;
        const analytics = {
            totalMessages: database.contacts.length,
            totalSubscribers: database.newsletter.length,
            totalEvents: database.events.length,
            messagesByStatus: {
                new: database.contacts.filter(c => c.status === 'new').length,
                read: database.contacts.filter(c => c.status === 'read').length,
                replied: database.contacts.filter(c => c.status === 'replied').length
            }
        };

        res.json(analytics);
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'विश्लेषण में त्रुटि' });
    }
});

// Get all contacts with filtering
router.get('/contacts', async (req, res) => {
    try {
        const database = req.database;
        const { status, search, page = 1, limit = 20 } = req.query;
        let contacts = [...database.contacts];

        if (status) {
            contacts = contacts.filter(c => c.status === status);
        }
        if (search) {
            contacts = contacts.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.email.toLowerCase().includes(search.toLowerCase()) ||
                c.message.toLowerCase().includes(search.toLowerCase())
            );
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const paginatedContacts = contacts
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(skip, skip + parseInt(limit));

        res.json({
            contacts: paginatedContacts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: contacts.length,
                pages: Math.ceil(contacts.length / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'संपर्क प्राप्त करने में त्रुटि' });
    }
});

// Reply to contact message
router.post('/contacts/:id/reply', async (req, res) => {
    try {
        const { message } = req.body;
        const contact = database.contacts.find(c => c._id === req.params.id);
        
        if (contact) {
            contact.status = 'replied';
            contact.updatedAt = new Date();
        }

        res.json({ success: true, contact, message: 'जवाब भेज दिया गया' });
    } catch (error) {
        res.status(500).json({ error: 'जवाब भेजने में त्रुटि' });
    }
});

module.exports = router;
