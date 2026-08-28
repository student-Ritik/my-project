# 🙏 Kabir Aasram - Backend API

A comprehensive Node.js/Express backend for the Kabir Aasram website with features for contact management, newsletter subscriptions, event management, and admin dashboard.

## 🚀 Features

- **Contact Form Management** - Collect and manage visitor inquiries
- **Newsletter System** - Subscribe/unsubscribe management with email notifications
- **Event Management** - Create and manage programs with registration
- **Email Service** - Automated email notifications (Gmail, SendGrid, etc.)
- **Admin Dashboard API** - Statistics, analytics, and management endpoints
- **MongoDB Integration** - Persistent data storage
- **CORS Support** - Cross-origin requests for frontend integration

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas cloud)
- Email service (Gmail with App Password, SendGrid, etc.)
- npm or yarn

## ⚙️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/kabir-aasram
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/kabir-aasram

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@kabiraasram.org
ADMIN_EMAIL=admin@kabiraasram.org

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-key
```

### 3. Email Setup (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account → Security → App passwords
3. Generate an App Password for "Mail" and "Windows"
4. Use this password in `.env` as `EMAIL_PASSWORD`

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Contact Management

```
POST   /api/contact              - Submit contact form
GET    /api/contact              - Get all messages (admin)
GET    /api/contact/:id          - Get specific message
PUT    /api/contact/:id/status   - Update message status
DELETE /api/contact/:id          - Delete message
```

### Newsletter

```
POST   /api/newsletter/subscribe     - Subscribe to newsletter
POST   /api/newsletter/unsubscribe   - Unsubscribe
GET    /api/newsletter/admin/subscribers - Get all subscribers (admin)
POST   /api/newsletter/admin/send    - Send bulk newsletter (admin)
```

### Events

```
GET    /api/events               - Get upcoming events
GET    /api/events/:id           - Get event details
POST   /api/events/:id/register  - Register for event
POST   /api/events/admin/create  - Create event (admin)
PUT    /api/events/admin/:id     - Update event (admin)
DELETE /api/events/admin/:id     - Delete event (admin)
```

### Programs

```
GET    /api/programs      - Get all programs
GET    /api/programs/:id  - Get specific program
```

### Admin Dashboard

```
GET    /api/admin/dashboard      - Dashboard statistics
GET    /api/admin/analytics      - Analytics data
GET    /api/admin/contacts       - Get all contacts with filtering
POST   /api/admin/contacts/:id/reply - Reply to contact message
DELETE /api/admin/contacts/cleanup/:days - Clean old messages
```

## 🗄️ Database Models

### Contact
- name, email, phone, subject, message
- status (new, read, replied, archived)
- timestamps

### Newsletter
- email, name, preferences
- status (subscribed, unsubscribed, bounced)
- subscription date

### Event
- title, date, time, location, category
- capacity, registered participants
- status (upcoming, ongoing, completed, cancelled)

## 🔐 Security Considerations

1. **JWT Authentication** - Add authentication middleware for admin routes
2. **Rate Limiting** - Implement rate limiting for API endpoints
3. **Input Validation** - Use express-validator for all inputs
4. **CORS** - Configure CORS properly for production
5. **Environment Variables** - Never commit `.env` file
6. **HTTPS** - Use HTTPS in production

## 📦 Deployment

### Deploy to Render (Free Tier)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy

### Deploy to Heroku

```bash
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
heroku config:set NODE_ENV=production
```

### Deploy to Railway

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 🧪 Testing Endpoints

### Test Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Test Newsletter Subscribe

```bash
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "User Name"
  }'
```

## 📚 API Response Format

Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error Response:
```json
{
  "error": "Error message",
  "status": 400
}
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check if MongoDB is running: `mongod`
- Verify MongoDB URI in `.env`
- For Atlas, allow IP address in network settings

### Email Not Sending
- Verify email credentials in `.env`
- Check Gmail App Password is set correctly
- Enable "Less secure apps" for Gmail (if not using App Password)
- Check email logs in console

### CORS Error
- Add your frontend URL to `FRONTEND_URL` in `.env`
- Ensure backend CORS is configured for frontend domain

## 📝 Logging

Check logs in the console output. For production, consider:
- Winston logger
- Morgan for HTTP requests
- Sentry for error tracking

## 🔄 Database Backup

```bash
# MongoDB backup
mongodump --db kabir-aasram --out ./backup

# MongoDB restore
mongorestore ./backup/kabir-aasram
```

## 📞 Support

For issues and support:
- Check error messages in console
- Review logs for detailed errors
- Test endpoints with Postman
- Verify environment variables

## 📄 License

ISC
