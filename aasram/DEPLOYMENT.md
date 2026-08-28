# 🚀 Kabir Aasram - Complete Deployment Guide

## प्रोजेक्ट संरचना

```
aasram/
├── index.html           # मुख्य वेबसाइट
├── script.js            # फ्रंटएंड API इंटीग्रेशन
├── styles.css           # स्टाइलिंग
├── config.js            # कॉन्फ़िगरेशन
├── manifest.json        # PWA मैनिफेस्ट
├── sw.js                # सर्विस वर्कर
├── admin/
│   └── index.html       # एडमिन डैशबोर्ड
└── backend/
    ├── server.js        # Express सर्वर
    ├── package.json     # डिपेंडेंसीज़
    ├── .env.example     # एनवायरनमेंट टेम्पलेट
    ├── models/          # डेटाबेस मॉडल्स
    ├── routes/          # API रूट्स
    └── utils/           # यूटिलिटी फंक्शन
```

## चरण 1: स्थानीय सेटअप (Local Development)

### 1.1 MongoDB सेटअप

#### विकल्प 1: लोकल MongoDB (Windows)
```powershell
# MongoDB डाउनलोड करें
# https://www.mongodb.com/try/download/community

# इंस्टॉल करें और सेवा शुरू करें
Start-Service MongoDB

# Verify MongoDB
mongod --version
```

#### विकल्प 2: MongoDB Atlas (Cloud)
```
1. https://www.mongodb.com/cloud/atlas पर जाएं
2. Free cluster बनाएं
3. Connection string कॉपी करें
4. .env में डालें
```

### 1.2 Backend सेटअप

```bash
# बैकएंड डायरेक्टरी में जाएं
cd aasram/backend

# डिपेंडेंसीज़ इंस्टॉल करें
npm install

# .env फाइल बनाएं
copy .env.example .env

# .env एडिट करें (अपनी जानकारी डालें)
# - MongoDB URI
# - Email credentials
# - Frontend URL
```

### 1.3 Gmail सेटअप (Email)

```
1. Gmail खोलें (gmail.com)
2. Settings → Security
3. "Less secure apps" को Enable करें
   या
   App Passwords जेनरेट करें:
   - Account → Security → App passwords
   - Select "Mail" and "Windows"
   - Generate करें
   - Password .env में डालें
```

### 1.4 सर्वर शुरू करें

```bash
# Development mode (auto-reload)
npm run dev

# या Production mode
npm start
```

**सर्वर चलेगा:** `http://localhost:5000`

### 1.5 फ्रंटएंड सेटअप

```bash
# index.html में API URL सेट करें (browser console में):
localStorage.setItem('API_BASE_URL', 'http://localhost:5000/api')

# या index.html में hardcode करें:
const API_BASE_URL = 'http://localhost:5000/api';
```

## चरण 2: API टेस्टिंग

### Postman में टेस्ट करें

```
# Contact Form सबमिट करें
POST http://localhost:5000/api/contact
Body (JSON):
{
  "name": "राज",
  "email": "raj@example.com",
  "message": "नमस्ते!"
}

# Newsletter सबस्क्राइब करें
POST http://localhost:5000/api/newsletter/subscribe
Body (JSON):
{
  "email": "user@example.com",
  "name": "नाम"
}

# Events देखें
GET http://localhost:5000/api/events
```

## चरण 3: प्रोडक्शन डिप्लॉयमेंट

### विकल्प 1: Render पर डिप्लॉय करें (FREE)

**सबसे आसान तरीका!**

```
1. GitHub पर अपना कोड push करें
   git add .
   git commit -m "Initial commit"
   git push origin main

2. https://render.com पर जाएं
3. नया Web Service बनाएं
4. अपनी GitHub repository चुनें
5. Settings में डालें:
   - Build Command: npm install
   - Start Command: npm start
6. Environment Variables जोड़ें:
   MONGODB_URI=mongodb+srv://...
   EMAIL_USER=your@gmail.com
   EMAIL_PASSWORD=app-password
   FRONTEND_URL=https://yourdomain.com
7. Deploy!
```

### विकल्प 2: Heroku पर डिप्लॉय करें

```bash
# Heroku CLI इंस्टॉल करें
# https://devcenter.heroku.com/articles/heroku-cli

# लॉगिन करें
heroku login

# नया ऐप बनाएं
heroku create your-app-name

# Environment variables सेट करें
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set EMAIL_USER=your@gmail.com
heroku config:set EMAIL_PASSWORD=app-password
heroku config:set FRONTEND_URL=https://your-domain.com

# डिप्लॉय करें
git push heroku main
```

### विकल्प 3: Railway पर डिप्लॉय करें

```
1. https://railway.app पर जाएं
2. GitHub से login करें
3. नया project बनाएं
4. Repository चुनें
5. Environment variables सेट करें
6. Deploy! (Automatic)
```

## चरण 4: फ्रंटएंड डिप्लॉयमेंट

### Netlify पर डिप्लॉय करें

```
1. https://netlify.com पर जाएं
2. "Add new site" → "Import an existing project"
3. GitHub repository चुनें
4. Deploy settings:
   - Build command: (छोड़ दें - static site है)
   - Publish directory: ./
5. Deploy!
6. Domain मिलेगा: your-site.netlify.app
```

### Firebase Hosting

```bash
npm install -g firebase-tools

firebase login
firebase init
firebase deploy
```

## चरण 5: डोमेन सेटअप

### डोमेन खरीदें
- Namecheap
- GoDaddy
- Hostinger

### DNS Settings

```
Frontend (Netlify):
CNAME: your-domain.com → your-site.netlify.app

Backend (Render/Railway):
Add as environment variable:
FRONTEND_URL=https://your-domain.com
```

## चरण 6: SSL Certificate (HTTPS)

- Netlify: Automatic
- Render: Automatic
- Heroku: Automatic

सभी आधुनिक होस्टिंग सर्विसेज़ फ्री SSL देते हैं।

## चरण 7: Admin Dashboard सेटअप

```bash
# सर्वर चलने के बाद खोलें:
http://localhost:5000 (local)
# या
https://your-domain.com/admin/index.html (production)
```

**एडमिन पैनल से:**
- संदेश देखें
- Newsletter भेजें
- Events प्रबंधित करें
- Analytics देखें

## उपयोगी कमांड्स

```bash
# बैकएंड को फिर से शुरू करें
npm restart

# लॉग देखें
npm logs

# डेटाबेस को बैकअप करें
mongodump --db kabir-aasram --out ./backup

# डेटाबेस को रिस्टोर करें
mongorestore ./backup/kabir-aasram

# प्रोडक्शन बिल्ड
npm run build
```

## समस्या निवारण

### 1. MongoDB Connection Error
```
✓ MongoDB चल रहा है? (mongod)
✓ Connection string सही है?
✓ IP whitelist में है? (Atlas)
```

### 2. Email Not Sending
```
✓ Gmail App Password सेट है?
✓ EMAIL_USER और EMAIL_PASSWORD सही है?
✓ .env फाइल में है?
```

### 3. CORS Error
```
✓ Frontend URL .env में सेट है?
✓ Frontend में API_BASE_URL सही है?
✓ Backend सर्वर चल रहा है?
```

### 4. Admin Dashboard Access
```
✓ Backend server चल रहा है?
✓ MongoDB connected है?
✓ Browser console में कोई error?
```

## सुरक्षा चेकलिस्ट

- [ ] .env फाइल GitHub में नहीं है
- [ ] JWT_SECRET random key है
- [ ] Production में EMAIL_PASSWORD सुरक्षित है
- [ ] CORS properly configured है
- [ ] Database backups नियमित हैं
- [ ] HTTPS (SSL) enable है
- [ ] Rate limiting लागू है
- [ ] Input validation काम कर रहा है

## परफॉर्मेंस ऑप्टिमाइजेशन

```bash
# Image compression
npm install -g imagemin-cli

# Database indexing
# MongoDB में automatically handled

# Caching
# Render/Railway में automatic
```

## Monitoring & Analytics

### Error Tracking
- Sentry (Free tier)
- Rollbar

### Performance Monitoring
- Google Analytics
- New Relic

### Database Monitoring
- MongoDB Atlas Dashboard

## संपर्क & Support

बैकएंड issues के लिए:
1. Error logs देखें
2. MongoDB connection verify करें
3. Email service verify करें
4. Postman से API test करें

## अगले कदम

1. **SSL Certificate**: सभी होस्टिंग में फ्री है
2. **CDN**: Cloudflare (फ्री)
3. **Email Service**: SendGrid (बेहतर रेट)
4. **Analytics**: Google Analytics + MongoDB charts
5. **Backup**: Automated daily backups
6. **Monitoring**: Uptime monitoring सेट करें

---

**Happy Hosting! 🎉**

किसी भी समस्या के लिए लॉग्स देखें और error messages को carefully पढ़ें।
