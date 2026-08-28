# 📱 Kabir Aasram Frontend - User Guide

## ✅ Status: Ready to Use

Your website is **fully functional** and ready for visitors!

---

## 🚀 Getting Started

### Option 1: Local Development
```bash
# No build process needed - just open in browser
Open: file:///path/to/index.html
```

### Option 2: Local Server (Recommended)
```bash
# Using Python (Windows)
python -m http.server 3000

# Using Node.js
npx http-server -p 3000

# Then open:
http://localhost:3000
```

### Option 3: With Backend
1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Open Frontend:**
   ```
   http://localhost:3000
   ```

---

## 📋 Frontend Features

### Pages & Sections
- **Home (index.html)**
  - Navigation menu
  - Hero section
  - Programs showcase
  - Contact form
  - Newsletter signup
  - Events section
  - Footer

### Interactive Elements
- **Mobile Menu** - Responsive hamburger menu
- **Contact Form** - Send messages to admin
- **Newsletter** - Subscribe for updates
- **Event Registration** - Register for programs
- **Program Showcase** - Display available programs

---

## 🔧 Configuration

### API Connection
The frontend automatically connects to the backend API.

**Configuration Location:** `script.js` (Line 1-2)
```javascript
// API Configuration
const API_BASE_URL = localStorage.getItem('API_BASE_URL') || 'http://localhost:5000/api';
```

### Change API URL
In browser console:
```javascript
// Set custom API URL
localStorage.setItem('API_BASE_URL', 'http://your-api-url/api');

// Reset to default
localStorage.removeItem('API_BASE_URL');

// Check current URL
console.log(localStorage.getItem('API_BASE_URL'));
```

---

## 📂 File Structure

```
frontend/
├── index.html           # Main website
├── script.js            # API integration & interactions
├── styles.css           # Styling
├── config.js            # Website configuration
├── manifest.json        # PWA manifest
├── robots.txt           # SEO
├── sitemap.xml          # Site map
├── sw.js                # Service worker (offline support)
├── netlify.toml         # Deployment config
└── images/
    └── ...              # Website images
```

---

## 🎨 Customization

### Change Website Title
Edit `index.html`:
```html
<title>Kabir Ashram Jaynagar</title>
```

### Change Colors
Edit `styles.css`:
```css
:root {
    --primary-color: #8B4513;  /* Brown */
    --secondary-color: #DAA520; /* Gold */
}
```

### Add New Sections
1. Add HTML in `index.html`
2. Add CSS in `styles.css`
3. Add JavaScript in `script.js`

### Update Program List
Edit `backend/db.js`:
```javascript
programs: [
    {
        id: 1,
        title: 'योग कक्षाएं',
        description: '...',
        time: '...',
        category: 'yoga'
    }
    // Add more programs
]
```

---

## 📝 Contact Form Integration

The contact form automatically sends data to backend:

```javascript
// Form data sent as:
{
    name: "यूजर का नाम",
    email: "user@example.com",
    phone: "9876543210",
    subject: "संदेश का विषय",
    message: "संदेश का पूरा टेक्स्ट"
}
```

**Response:**
- ✅ Success: "आपका संदेश सफलतापूर्वक भेज दिया गया है"
- ❌ Error: Error message displayed

### View Submitted Messages
- **Admin Dashboard:** http://localhost:5000/admin/
- **API:** GET http://localhost:5000/api/admin/dashboard

---

## 📧 Newsletter Integration

### Subscribe Button
Automatically handles newsletter subscription:

```javascript
// Subscriber data:
{
    email: "subscriber@example.com",
    name: "सदस्य का नाम",
    preferences: {
        yoga: true,
        meditation: true,
        events: true
    }
}
```

### View Subscribers
- **Admin Dashboard:** http://localhost:5000/admin/
- **API:** GET http://localhost:5000/api/newsletter/admin/subscribers

---

## 🎟️ Event Registration

### Register Button
Click "Register" on any event:

```javascript
// Sends to backend:
{
    name: "नाम",
    email: "email@example.com",
    phone: "9876543210"
}
```

### Create New Event
Use Admin Dashboard → Events section:
- Title
- Date & Time
- Location
- Capacity
- Description

---

## 🌐 Deployment

### Deploy to Netlify (Easiest)

#### Option 1: Drag & Drop
1. Go to netlify.com
2. Sign up for free account
3. Drag folder onto Netlify
4. Website is live! 🎉

#### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect GitHub to Netlify
3. Auto-deploys on push
4. Set environment variables:
   - `API_BASE_URL`: Your backend API URL

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to GitHub Pages
```bash
# Push to GitHub
git push origin main

# Enable GitHub Pages in settings
# Choose: main branch as source
```

---

## 🔒 Security Checklist

- [ ] Update contact email in form action
- [ ] Configure CORS for production domain
- [ ] Setup SSL/HTTPS
- [ ] Enable rate limiting on backend
- [ ] Validate all form inputs
- [ ] Setup monitoring/logging
- [ ] Regular backups
- [ ] Password protect admin dashboard (optional)

---

## ⚡ Performance Tips

### Image Optimization
```bash
# Compress images
npm install -g imagemin-cli
imagemin images/* --out-dir=images
```

### Caching Strategy
- Set cache headers in web server
- Use service worker for offline support
- Minimize CSS/JavaScript

### SEO Optimization
- ✅ Meta tags configured
- ✅ Robots.txt configured
- ✅ Sitemap.xml configured
- [ ] Submit to Google Search Console
- [ ] Add structured data (Schema.org)

---

## 🧪 Testing

### Browser Testing
- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile: iOS Safari, Chrome Mobile

### Responsive Design
- Desktop: 1920px+
- Tablet: 768px - 1024px
- Mobile: 320px - 767px

### Accessibility
- Keyboard navigation: Tab through all elements
- Screen readers: Test with NVDA/JAWS
- Color contrast: Use WebAIM Contrast Checker

---

## 🐛 Troubleshooting

### Contact Form Not Working
1. **Check Backend:** Verify `npm run dev` is running
2. **Check URL:** Browser console → localStorage → API_BASE_URL
3. **Check Network:** Open DevTools → Network tab → see requests
4. **Check Errors:** Open DevTools → Console tab

### Newsletter Not Subscribing
- Same as contact form
- Check API endpoint: GET `/api/newsletter/admin/subscribers`

### Images Not Loading
- Check file paths in HTML
- Ensure image files exist in `images/` folder
- Check browser console for errors

### Styling Issues
- Clear browser cache: Ctrl+Shift+Delete
- Check CSS file is loaded: DevTools → Network → styles.css
- Check for CSS conflicts

---

## 📱 Mobile Optimization

### Mobile Menu
- Automatically shows on screens < 768px
- Click hamburger (☰) to toggle
- Auto-closes when link clicked

### Touch-Friendly
- Buttons sized for touch (min 44x44px)
- Proper spacing between elements
- Mobile-optimized forms

### Performance
- Lazy load images with loading="lazy"
- Minimize JavaScript execution
- Use CSS for animations

---

## 🚀 Advanced Features

### PWA Support
- Add to home screen (mobile)
- Works offline (with Service Worker)
- Native app-like experience

**Install App:**
1. Open on mobile browser
2. Tap menu → Add to Home Screen
3. App appears on home screen

### Service Worker
- Caches assets for offline use
- Enabled in `sw.js`
- Updates automatically

---

## 📊 Analytics Setup (Optional)

### Add Google Analytics
1. Create account at google.com/analytics
2. Get tracking ID (G-XXXXXX)
3. Add to HTML (before `</head>`):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXX');
</script>
```

### Monitor Performance
- Google Analytics Dashboard
- Netlify Analytics (if deployed)
- Custom logging to backend

---

## 📝 Maintenance

### Regular Updates
- Update content as needed
- Monitor contact form messages
- Review subscriber feedback
- Update event listings

### Backups
- Backup website files weekly
- Backup database daily (when using MongoDB)
- Keep version control updated

### Monitoring
- Check error logs
- Monitor page load times
- Track visitor analytics
- Monitor API responses

---

## 🎓 Learning Resources

- **HTML/CSS:** MDN Web Docs
- **JavaScript:** JavaScript.info
- **Frontend:** Frontend Masters
- **Deployment:** Netlify Docs
- **Backend:** Express.js Docs

---

## 🤝 Support

### Getting Help
1. Check browser console for errors
2. Review network requests
3. Check backend logs
4. Verify API configuration

### Common Issues

**Q: Form not submitting**
A: Check if backend is running on port 5000

**Q: Images not showing**
A: Verify image paths in HTML

**Q: Page styling broken**
A: Clear cache (Ctrl+Shift+Delete)

**Q: Slow page load**
A: Compress images, minify CSS/JS

---

## 🎉 You're All Set!

Your website is ready to go live!

### Next Steps:
1. ✅ Test all features
2. ✅ Deploy to Netlify/Vercel
3. ✅ Setup backend on production server
4. ✅ Configure custom domain
5. ✅ Setup SSL certificate
6. ✅ Monitor analytics
7. ✅ Regular maintenance

---

**Status: ✅ 100% Ready for Deployment**

यह वेबसाइट पूरी तरह से तैयार है और लाइव हो सकती है!
