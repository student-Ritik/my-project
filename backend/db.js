// In-Memory Database (Testing Mode)
const database = {
    contacts: [],
    newsletter: [],
    events: [],
    programs: [
        {
            id: 1,
            title: 'दैनिक योग कक्षाएं',
            icon: 'fa-spa',
            description: 'प्रातः और संध्या में नियमित योग कक्षाएं',
            time: 'सुबह 6:00 AM - शाम 6:00 PM'
        },
        {
            id: 2,
            title: 'ध्यान साधना',
            icon: 'fa-moon',
            description: 'मन की शांति के लिए ध्यान',
            time: 'सप्ताह में 1 दिन'
        },
        {
            id: 3,
            title: 'भजन और कीर्तन',
            icon: 'fa-chant',
            description: 'भक्ति संगीत और आध्यात्मिक गीत',
            time: 'रविवार'
        }
    ]
};

module.exports = database;
