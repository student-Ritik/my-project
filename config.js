/* 
   कबीर आश्रम जयनगर - कॉन्फ़िगरेशन फाइल
   यहाँ आश्रम की जानकारी को आसानी से अपडेट करें
*/

const aasramConfig = {
    // आश्रम का नाम
    name: "कबीर आश्रम",
    location: "जयनगर",
    city: "बेंगलुरु",
    
    // संपर्क जानकारी
    contact: {
        phone: "+91-80-XXXX-XXXX",
        email: "info@kabiraasram.org",
        address: "कबीर आश्रम, जयनगर, बेंगलुरु - 560069, भारत",
        website: "www.kabiraasram.org"
    },
    
    // खुलने के समय
    hours: {
        start: "6:00 AM",
        end: "8:00 PM",
        daysOpen: "सोमवार - रविवार (वर्ष भर खुला)"
    },
    
    // सोशल मीडिया लिंक
    social: {
        facebook: "https://facebook.com/kabiraasram",
        twitter: "https://twitter.com/kabiraasram",
        instagram: "https://instagram.com/kabiraasram",
        youtube: "https://youtube.com/kabiraasram"
    },
    
    // गुरु/प्रबंधक जानकारी
    staff: {
        founder: {
            name: "स्वामी कबीर दास",
            title: "संस्थापक",
            bio: "आध्यात्मिक गुरु और दर्शक"
        },
        manager: {
            name: "[प्रबंधक का नाम]",
            title: "आश्रम प्रबंधक",
            contact: "manager@kabiraasram.org"
        }
    },
    
    // कार्यक्रम सूची
    programs: [
        {
            name: "दैनिक योग कक्षाएं",
            time: "सुबह 6:00 AM - शाम 6:00 PM",
            frequency: "रोजाना",
            capacity: "30-40 लोग"
        },
        {
            name: "ध्यान साधना",
            time: "सुबह 5:30 AM, शाम 5:30 PM",
            frequency: "सप्ताह में 5 दिन",
            capacity: "20 लोग"
        },
        {
            name: "भजन और कीर्तन",
            time: "शनिवार व रविवार - 6:00 PM",
            frequency: "सप्ताहांत",
            capacity: "50-100 लोग"
        },
        {
            name: "धर्मशास्त्र सेमिनार",
            time: "विविध",
            frequency: "महीने में 2 बार",
            capacity: "30 लोग"
        }
    ],
    
    // सुविधाएं
    facilities: [
        "योग हॉल",
        "ध्यान कक्ष",
        "मंदिर",
        "पुस्तकालय",
        "भोजन हॉल",
        "आवास सुविधा",
        "बगीचा",
        "पार्किंग"
    ],
    
    // किराए/दान (वैकल्पिक)
    pricing: {
        dayVisit: "मुफ्त",
        weeklyResidence: "₹2000-5000 प्रति सप्ताह",
        monthlyResidence: "₹8000-15000 प्रति महीना",
        yogaClass: "मुफ्त या दान के आधार पर",
        donation: "सभी दान स्वागत है"
    },
    
    // वर्षिक कार्यक्रम
    specialEvents: [
        {
            name: "कबीर जयंती",
            date: "अक्टूबर",
            description: "कबीर दास की जयंती का पालन"
        },
        {
            name: "योग दिवस",
            date: "21 जून",
            description: "अंतर्राष्ट्रीय योग दिवस समारोह"
        },
        {
            name: "दिवाली समारोह",
            date: "नवंबर",
            description: "प्रकाश का त्योहार"
        },
        {
            name: "नवरात्रि उत्सव",
            date: "सितंबर-अक्टूबर",
            description: "9 दिनों का आध्यात्मिक उत्सव"
        }
    ],
    
    // पाठ्यक्रम
    courses: [
        {
            name: "बेसिक योग कोर्स",
            duration: "4 सप्ताह",
            level: "शुरुआती"
        },
        {
            name: "उन्नत ध्यान",
            duration: "8 सप्ताह",
            level: "मध्यम से उन्नत"
        },
        {
            name: "भगवद्गीता अध्ययन",
            duration: "3 महीने",
            level: "सभी स्तरों के लिए"
        }
    ],
    
    // मिशन और दृष्टि
    mission: "प्रत्येक व्यक्ति को आंतरिक शांति, ज्ञान और आध्यात्मिक उन्नति के मार्ग पर ले जाना।",
    vision: "एक ऐसा संसार बनाना जहां सभी लोग आध्यात्मिक ज्ञान और समरसता में जीते हैं।",
    
    // कुछ उद्धरण
    quotes: [
        "ज्ञान ही शक्ति है।",
        "मन की शांति सर्वोच्च धन है।",
        "ध्यान से पहचानो अपने आप को।",
        "सत्य ही मार्ग है।"
    ]
};

// कॉन्फ़िगरेशन कैसे उपयोग करें:
// 
// JavaScript में:
// console.log(aasramConfig.contact.phone);
// console.log(aasramConfig.name);
// 
// HTML में अपडेट करने के लिए JavaScript का उपयोग करें:
// document.querySelector('.phone').textContent = aasramConfig.contact.phone;

export default aasramConfig;
