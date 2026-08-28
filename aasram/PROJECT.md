# 🙏 Kabir Aasram - Complete Web Application

एक पूर्ण, प्रोडक्शन-रेडी वेबसाइट **कबीर आश्रम जयनगर** के लिए बनाई गई है।

## 📁 प्रोजेक्ट संरचना

```
aasram/
├── 📄 index.html              # मुख्य वेबसाइट
├── 🎨 styles.css              # स्टाइलिंग
├── 🔧 script.js               # फ्रंटएंड JavaScript
├── ⚙️ config.js               # कॉन्फ़िगरेशन
├── 📱 manifest.json           # PWA Manifest
├── 🔄 sw.js                   # Service Worker
├── 🖼️ images/                 # आश्रम की तस्वीरें
├── 🔐 admin/                  # Admin Dashboard
│   └── index.html            # डैशबोर्ड UI
├── 🚀 backend/                # Express Backend API
│   ├── server.js             # मुख्य सर्वर
│   ├── package.json          # Dependencies
│   ├── .env.example          # Environment Template
│   ├── models/               # Database Models
│   │   ├── Contact.js
│   │   ├── Newsletter.js
│   │   └── Event.js
│   ├── routes/               # API Routes
│   │   ├── contact.js
│   │   ├── newsletter.js
│   │   ├── events.js
│   │   ├── programs.js
│   │   └── admin.js
│   ├── utils/                # Utilities
│   │   └── email.js
│   └── README.md             # Backend Documentation
├── 📖 DEPLOYMENT.md          # Deployment Guide
├── 📋 IMPLEMENTATION_GUIDE.md # Implementation Tips
└── ⚡ QUICKSTART.md          # Quick Start Guide
```

## ✨ मुख्य विशेषताएं

### Frontend (वेबसाइट)
- ✅ **प्रतिक्रियाशील डिजाइन** - सभी डिवाइसों पर काम करता है
- ✅ **हिंदी समर्थन** - पूरी तरह हिंदी में
- ✅ **PWA** - ऑफलाइन काम करता है
- ✅ **Contact Form** - आगंतुक संदेश
- ✅ **Gallery** - आश्रम की तस्वीरें
- ✅ **Programs Section** - योग, ध्यान, भजन

### Backend (API)
- ✅ **Contact Management** - संदेश प्राप्त करें और सहेजें
- ✅ **Email Notifications** - आटोमेटिक ईमेल भेजें
- ✅ **Newsletter System** - सदस्यता प्रबंधन
- ✅ **Event Management** - कार्यक्रम और पंजीकरण
- ✅ **Admin Dashboard** - सब कुछ प्रबंधित करें
- ✅ **MongoDB Database** - डेटा स्टोरेज
- ✅ **CORS Support** - क्रॉस-ऑरिजिन सपोर्ट

## 🚀 त्वरित शुरुआत

### Frontend (5 सेकंड)
```bash
# बस खोलें
index.html को किसी भी ब्राउज़र में
```

### Backend (5 मिनट)
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

विस्तृत गाइड के लिए देखें: [Backend QUICKSTART.md](./backend/QUICKSTART.md)

## 📖 Documentation

| दस्तावेज़ | विवरण |
|---------|--------|
| [README.md](./README.md) | प्रोजेक्ट परिचय |
| [QUICKSTART.md](./QUICKSTART.md) | Frontend शुरुआत |
| [backend/QUICKSTART.md](./backend/QUICKSTART.md) | Backend शुरुआत |
| [backend/README.md](./backend/README.md) | Backend API दस्तावेज़ |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | प्रोडक्शन डिप्लॉयमेंट |
| [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) | अपडेट गाइड |

## 🔧 API Endpoints

### Contact (संदेश)
```
POST   /api/contact              - संदेश भेजें
GET    /api/contact/:id          - संदेश देखें
PUT    /api/contact/:id/status   - स्थिति अपडेट करें
DELETE /api/contact/:id          - संदेश हटाएं
```

### Newsletter (न्यूजलेटर)
```
POST   /api/newsletter/subscribe    - सबस्क्राइब करें
POST   /api/newsletter/unsubscribe  - अनसबस्क्राइब करें
POST   /api/newsletter/admin/send   - न्यूजलेटर भेजें
```

### Events (कार्यक्रम)
```
GET    /api/events              - कार्यक्रम सूची
POST   /api/events/:id/register - पंजीकरण करें
POST   /api/events/admin/create - नया कार्यक्रम
```

### Admin (एडमिन)
```
GET    /api/admin/dashboard  - डैशबोर्ड डेटा
GET    /api/admin/analytics  - विश्लेषण डेटा
GET    /api/admin/contacts   - सभी संदेश
```

## 🗄️ Database Models

### Contact (संपर्क)
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: 'new|read|replied|archived',
  createdAt: Date
}
```

### Newsletter (न्यूजलेटर)
```javascript
{
  email: String,
  name: String,
  status: 'subscribed|unsubscribed',
  preferences: {
    yoga: Boolean,
    meditation: Boolean,
    events: Boolean
  },
  subscribedAt: Date
}
```

### Event (कार्यक्रम)
```javascript
{
  title: String,
  date: Date,
  startTime: String,
  endTime: String,
  category: 'yoga|meditation|bhajan|seminar|pooja',
  capacity: Number,
  registeredParticipants: Array,
  status: 'upcoming|ongoing|completed'
}
```

## 🌐 Hosting Options

### Frontend
- **Netlify** (सुझाया गया) - सबसे आसान
- Firebase Hosting
- GitHub Pages
- Vercel

### Backend
- **Render** (सुझाया गया) - फ्री टियर
- Heroku
- Railway
- AWS
- Google Cloud

### Database
- **MongoDB Atlas** - फ्री क्लाउड
- Local MongoDB
- AWS MongoDB
- DigitalOcean

## 📋 Setup Checklist

### Local Development
- [ ] Node.js (v14+) इंस्टॉल करें
- [ ] MongoDB सेटअप करें
- [ ] `backend/npm install` चलाएं
- [ ] `.env` फाइल बनाएं
- [ ] Email credentials जोड़ें
- [ ] `npm run dev` से सर्वर शुरू करें
- [ ] `index.html` खोलें
- [ ] Contact form टेस्ट करें

### Production Deployment
- [ ] GitHub पर कोड push करें
- [ ] Netlify पर frontend डिप्लॉय करें
- [ ] Render/Railway पर backend डिप्लॉय करें
- [ ] MongoDB Atlas क्लस्टर बनाएं
- [ ] Domain नाम खरीदें
- [ ] DNS settings कॉन्फ़िगर करें
- [ ] SSL Certificate सेटअप करें
- [ ] Email service verify करें
- [ ] Admin dashboard टेस्ट करें
- [ ] Analytics सेटअप करें

## 🔐 Security

### करने योग्य
- ✅ Environment variables को गुप्त रखें
- ✅ `.env` को `.gitignore` में रखें
- ✅ HTTPS use करें
- ✅ Input validation लागू करें
- ✅ CORS properly configure करें
- ✅ Rate limiting जोड़ें
- ✅ Database backups लें

### न करने योग्य
- ❌ API keys को कोड में न रखें
- ❌ Admin password share न करें
- ❌ Production keys GitHub पर न डालें
- ❌ Unsecured HTTP न use करें

## 📊 Performance Tips

- 🖼️ Images को compress करें
- ⚡ CDN (Cloudflare) use करें
- 🗄️ Database indexes लगाएं
- 📦 Code minification करें
- 🔄 Caching implement करें

## 🐛 Troubleshooting

### Frontend Issues
| समस्या | समाधान |
|--------|--------|
| API काम नहीं कर रहा | Backend सर्वर चलता है? Check localhost:5000 |
| Form submit नहीं हो रहा | Browser console में errors? Check network tab |
| Styles load नहीं हो रहे | styles.css path सही है? |

### Backend Issues
| समस्या | समाधान |
|--------|--------|
| MongoDB connection fail | mongod चल रहा है? Connection string check करें |
| Email नहीं भेज रहा | Gmail App Password verify करें |
| Port already in use | दूसरा port use करें या पहले को kill करें |

## 📞 Support Resources

- 📚 [Backend README](./backend/README.md) - विस्तृत दस्तावेज़
- 🚀 [Deployment Guide](./DEPLOYMENT.md) - प्रोडक्शन सेटअप
- ⚡ [Quick Start](./backend/QUICKSTART.md) - तेज़ शुरुआत
- 🔧 [Implementation Guide](./IMPLEMENTATION_GUIDE.md) - कस्टमाइज़ेशन

## 🎯 Next Steps

1. **Local Setup करें** - Backend और Frontend दोनों
2. **API Integration टेस्ट करें** - सभी endpoints काम करते हैं?
3. **Email Setup करें** - Gmail या SendGrid
4. **Admin Dashboard कॉन्फ़िगर करें** - संदेश और events
5. **Production Deploy करें** - Render + Netlify
6. **Custom Domain जोड़ें** - अपना domain नाम
7. **SSL Setup करें** - HTTPS enable
8. **Analytics Add करें** - Google Analytics
9. **Backup Automate करें** - नियमित backups
10. **Monitor करें** - Uptime monitoring

## 📝 License

ISC

## 👨‍💼 Support

किसी भी समस्या के लिए:
1. Error logs देखें
2. Documentation पढ़ें
3. API endpoints को Postman में test करें
4. Console errors को analyze करें

---

**Happy Building! 🙏**

*इस प्रोजेक्ट को अपने आवश्यकताओं के अनुसार कस्टमाइज़ करें।*
