# 🙏 Kabir Aasram Backend - Complete Setup Guide

## ✅ Status: Fully Operational

Your backend is **fully configured and running** on `http://localhost:5000`

---

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Kabir Aasram Backend API
📍 Server running on: http://localhost:5000
📍 Admin Dashboard: http://localhost:5000/admin/
💾 Database: In-Memory (Testing Mode)
✅ Ready to receive requests!
```

### 2. Access Admin Dashboard
```
http://localhost:5000/admin/
```

### 3. Test API Endpoints
```bash
node backend/test-api.js
```

---

## 📋 Available API Endpoints

### Contact Forms
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/contact` | POST | Submit contact form |
| `/api/contact/:id` | GET | Get specific message |
| `/api/contact/:id/status` | PUT | Update message status |
| `/api/contact/:id` | DELETE | Delete message |
| `/api/contact/messages` | GET | Get all messages |

**Example:**
```javascript
// Submit contact form
const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'नाम',
        email: 'email@example.com',
        phone: '9876543210',
        subject: 'विषय',
        message: 'संदेश'
    })
});
```

### Newsletter
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/newsletter/subscribe` | POST | Subscribe to newsletter |
| `/api/newsletter/unsubscribe` | POST | Unsubscribe |
| `/api/newsletter/admin/subscribers` | GET | Get all subscribers |
| `/api/newsletter/admin/send` | POST | Send newsletter |

**Example:**
```javascript
// Subscribe to newsletter
const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'user@example.com',
        name: 'नाम',
        preferences: { yoga: true, meditation: true, events: true }
    })
});
```

### Programs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/programs` | GET | Get all programs |

### Events
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/events` | GET | Get upcoming events |
| `/api/events/:id` | GET | Get specific event |
| `/api/events/:id/register` | POST | Register for event |
| `/api/events/admin/create` | POST | Create new event |
| `/api/events/admin/:id` | PUT | Update event |
| `/api/events/admin/:id` | DELETE | Delete event |

### Admin Dashboard
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/dashboard` | GET | Dashboard statistics |
| `/api/admin/analytics` | GET | Detailed analytics |
| `/api/admin/contacts` | GET | Get all contacts (paginated) |

---

## 📁 Project Structure

```
aasram/
├── backend/
│   ├── server.js              # Main Express app
│   ├── db.js                  # In-memory database
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment config
│   ├── routes/
│   │   ├── contact.js         # Contact form API
│   │   ├── newsletter.js      # Newsletter API
│   │   ├── events.js          # Events API
│   │   ├── programs.js        # Programs API
│   │   └── admin.js           # Admin API
│   ├── test-api.js            # API test script
│   └── test-integration.js    # Integration test
├── admin/
│   ├── index.html             # Admin dashboard
│   ├── styles.css             # Dashboard styles
│   └── script.js              # Dashboard logic
├── index.html                 # Frontend
├── script.js                  # Frontend API integration
└── styles.css                 # Frontend styles
```

---

## 🔌 Database Configuration

### Current: In-Memory (Testing Mode) ✅
- **Location:** `backend/db.js`
- **Data Storage:** JavaScript objects
- **Persistence:** Lost on server restart
- **Best For:** Development & Testing

### Database Structure
```javascript
{
  contacts: [
    { _id, name, email, phone, subject, message, status, createdAt }
  ],
  newsletter: [
    { _id, email, name, preferences, status, subscribedAt }
  ],
  events: [
    { _id, title, date, category, registeredParticipants, registeredCount }
  ],
  programs: [
    { id, title, icon, description, time, category }
  ]
}
```

### Future: MongoDB Atlas
When ready to persist data:

1. **Create Account:** mongodb.com/cloud/atlas
2. **Setup Free Cluster:** Click "Build a Database"
3. **Get Connection String:** Copy from "Connect" button
4. **Update `.env`:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kabiraasram
   ```
5. **Uncomment MongoDB code** in `backend/server.js`

---

## 📧 Email Configuration (Optional)

To enable email notifications:

1. **Enable Gmail 2FA:**
   - Go to myaccount.google.com
   - Security → 2-Step Verification

2. **Generate App Password:**
   - Go to myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Copy generated password

3. **Update `.env`:**
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@kabiraasram.com
   ```

4. **Test Email:**
   ```bash
   node -e "
   require('dotenv').config();
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASSWORD
       }
   });
   transporter.sendMail({
       to: 'test@example.com',
       subject: 'Test Email',
       html: '<h1>यह एक टेस्ट ईमेल है</h1>'
   }).then(() => console.log('✅ Email sent!')).catch(e => console.error('❌', e));
   "
   ```

---

## 🧪 Testing

### Run Full API Test
```bash
npm run test
# or
node backend/test-api.js
```

### Run Integration Test
```bash
node backend/test-integration.js
```

### Manual Testing with cURL

**Submit Contact:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "email":"test@example.com",
    "message":"Hello"
  }'
```

**Subscribe Newsletter:**
```bash
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "name":"User"
  }'
```

---

## 🔒 Security Notes

### Development Mode (Current)
- ✅ CORS enabled for localhost:3000
- ✅ Input validation enabled
- ⚠️ In-memory database (no persistence)
- ⚠️ No authentication required

### For Production
- [ ] Enable JWT authentication
- [ ] Setup MongoDB
- [ ] Configure HTTPS
- [ ] Setup rate limiting
- [ ] Enable CORS for production URL
- [ ] Configure password encryption
- [ ] Setup error logging

---

## 📊 Admin Dashboard Features

**URL:** `http://localhost:5000/admin/`

### Available Sections
1. **Statistics** - Total messages, subscribers, events
2. **Messages** - View & manage contact form submissions
3. **Subscribers** - Newsletter subscriber management
4. **Events** - Create & manage events
5. **Analytics** - Message statistics by status
6. **Preferences** - Newsletter preferences

### Dashboard Actions
- 📊 View real-time statistics
- 💬 Read contact messages
- ✏️ Update message status (new/read/replied)
- 🗑️ Delete messages
- 📧 Manage newsletter subscribers
- 📅 Create new events
- 🎯 Track registrations

---

## 🐛 Troubleshooting

### Server won't start
```
❌ Error: EADDRINUSE: address already in use :::5000
```
**Solution:** 
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### API returning 404
- Verify server is running: `npm run dev`
- Check API URL: Should be `http://localhost:5000/api`
- Check route paths in browser console

### CORS errors
- Server already configured for `localhost:3000`
- If using different port, update in `.env`:
  ```
  FRONTEND_URL=http://localhost:3000
  ```

### Database empty after restart
- This is expected (in-memory mode)
- Data persists during current session only
- Switch to MongoDB for persistence

---

## 🚀 Deployment

### Deploy to Netlify (Frontend)
1. Connect GitHub repository
2. Build command: `npm run build` (if using build tool)
3. Publish directory: `/` (root)
4. Environment: Set `API_BASE_URL` in netlify.toml

### Deploy Backend to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas
heroku addons:create mongolab

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to VPS (DigitalOcean, AWS)
1. SSH into server
2. Clone repository
3. Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -`
4. Install PM2: `npm install -g pm2`
5. Start server: `pm2 start backend/server.js`
6. Setup Nginx as reverse proxy
7. Configure SSL with Let's Encrypt

---

## 📞 Support

For issues or questions:
- Check logs: Terminal output during `npm run dev`
- Test API: `node backend/test-api.js`
- Verify database: Check Admin Dashboard stats
- Check environment: Look in `.env` file

---

## 📝 Notes

- **In-Memory Database:** Ideal for development/testing, data lost on restart
- **API Ready:** All endpoints functional and tested
- **Admin Dashboard:** Fully operational at `/admin/`
- **Frontend Integration:** `script.js` already configured
- **Next Steps:** 
  1. Test with frontend
  2. Setup MongoDB for production
  3. Configure email service
  4. Deploy to production server

---

**Status: ✅ 100% Complete & Operational**

यह सिस्टम पूरी तरह से तैयार है और काम कर रहा है। अब फ्रंटएंड को टेस्ट करें!
