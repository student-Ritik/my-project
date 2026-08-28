# ⚡ Backend Quick Start Guide

## 5 मिनट में शुरू करें

### 1️⃣ Backend Setup (बैकएंड सेटअप)

```bash
# बैकएंड फोल्डर में जाएं
cd aasram/backend

# Dependencies install करें
npm install

# .env फाइल बनाएं
copy .env.example .env
```

### 2️⃣ .env Configure करें

`backend/.env` फाइल को खोलें और भरें:

```
# Minimum required settings:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kabir-aasram
FRONTEND_URL=http://localhost:3000

# Gmail configuration (optional but recommended):
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@kabiraasram.org
```

### 3️⃣ MongoDB Setup

```bash
# Windows - MongoDB Community Edition
# Download: https://www.mongodb.com/try/download/community
# या यदि chocolatey है:
choco install mongodb-community

# शुरू करें:
net start MongoDB

# या MongoDB Atlas (Cloud) use करें:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kabir-aasram
```

### 4️⃣ सर्वर शुरू करें

```bash
npm run dev
```

✅ **हो गया!** Backend चल रहा है: `http://localhost:5000`

---

## API Testing

### कंसोल में API test करें:

```javascript
// Contact भेजें
fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'राज',
        email: 'raj@example.com',
        message: 'नमस्ते!'
    })
}).then(r => r.json()).then(console.log)

// Events देखें
fetch('http://localhost:5000/api/events')
    .then(r => r.json())
    .then(console.log)

// Newsletter सबस्क्राइब करें
fetch('http://localhost:5000/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'user@example.com',
        name: 'नाम'
    })
}).then(r => r.json()).then(console.log)
```

---

## Frontend Integration

`index.html` में frontend को backend से जोड़ें:

```javascript
// Browser console में set करें:
localStorage.setItem('API_BASE_URL', 'http://localhost:5000/api')
```

या `script.js` में सीधे सेट करें:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## Admin Dashboard

```
URL: http://localhost:5000/admin/index.html
Features:
- संदेशों को देखें और जवाब दें
- Newsletter भेजें
- Events प्रबंधित करें
- Analytics देखें
```

---

## Production Deploy

### Render पर (सबसे आसान)

```
1. GitHub पर push करें
2. render.com पर जाएं
3. "New +" → "Web Service"
4. अपनी repo चुनें
5. Environment variables जोड़ें
6. Deploy!
```

### Environment Variables (Production)

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
EMAIL_USER=admin@kabiraasram.org
EMAIL_PASSWORD=secure-password
FRONTEND_URL=https://kabiraasram.com
JWT_SECRET=very-secure-key
```

---

## Common Issues

| समस्या | समाधान |
|--------|--------|
| **Port 5000 already in use** | `netstat -ano` से process खोजें, फिर kill करें |
| **MongoDB not found** | MongoDB service check करें: `net start MongoDB` |
| **Email not sending** | Gmail App Password verify करें |
| **CORS Error** | FRONTEND_URL check करें |

---

## Useful Commands

```bash
# Server restart
npm restart

# Dev mode with console logs
npm run dev

# Kill port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Database backup
mongodump --db kabir-aasram --out ./backup

# Database restore
mongorestore ./backup
```

---

## Next Steps

1. ✅ Backend running
2. ✅ Frontend integrated
3. ⏭️ Deploy to production
4. ⏭️ Setup custom domain
5. ⏭️ Add admin authentication
6. ⏭️ Setup monitoring

---

**Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup!** 🚀
