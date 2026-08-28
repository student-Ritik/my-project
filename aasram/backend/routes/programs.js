const express = require('express');
const router = express.Router();

// Sample programs data (in production, use MongoDB)
const programs = [
    {
        id: 1,
        title: 'दैनिक योग कक्षाएं',
        icon: 'fa-spa',
        description: 'प्रातः और संध्या में नियमित योग कक्षाएं सभी स्तरों के लिए',
        time: 'सुबह 6:00 AM - शाम 6:00 PM',
        category: 'yoga'
    },
    {
        id: 2,
        title: 'ध्यान साधना',
        icon: 'fa-moon',
        description: 'मन की शांति और एकाग्रता के लिए विभिन्न ध्यान तकनीकें',
        time: 'सप्ताह में 1 दिन',
        category: 'meditation'
    },
    {
        id: 3,
        title: 'भजन और कीर्तन',
        icon: 'fa-chant',
        description: 'भक्ति संगीत और आध्यात्मिक गीत',
        time: 'रविवार',
        category: 'bhajan'
    },
    {
        id: 4,
        title: 'धर्मशास्त्र सेमिनार',
        icon: 'fa-scroll',
        description: 'भगवद्गीता और उपनिषद पर विशेष व्याख्यान',
        time: 'महीने में 4 बार',
        category: 'seminar'
    },
    {
        id: 5,
        title: 'आश्रम भोजन',
        icon: 'fa-utensils',
        description: 'शुद्ध शाकाहारी सात्विक भोजन',
        time: 'रोज़ उपलब्ध',
        category: 'food'
    },
    {
        id: 6,
        title: 'आवास सुविधा',
        icon: 'fa-bed',
        description: 'साधकों के लिए आरामदायक आवास व्यवस्था',
        time: 'वर्ष भर खुला',
        category: 'accommodation'
    }
];

// GET - Get all programs
router.get('/', (req, res) => {
    const { category } = req.query;
    
    if (category) {
        const filtered = programs.filter(p => p.category === category);
        return res.json({ programs: filtered });
    }
    
    res.json({ programs });
});

// GET - Get program by ID
router.get('/:id', (req, res) => {
    const program = programs.find(p => p.id === parseInt(req.params.id));
    
    if (!program) {
        return res.status(404).json({ error: 'कार्यक्रम नहीं मिला' });
    }
    
    res.json({ program });
});

module.exports = router;
