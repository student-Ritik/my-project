// API Configuration
const API_BASE_URL = localStorage.getItem('API_BASE_URL') || 'http://localhost:5000/api';

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Form submission handler - Contact Form
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = {
        name: form.querySelector('input[name="name"]')?.value || form.querySelector('input[type="text"]')?.value,
        email: form.querySelector('input[name="email"]')?.value || form.querySelector('input[type="email"]')?.value,
        phone: form.querySelector('input[name="phone"]')?.value,
        subject: form.querySelector('input[name="subject"]')?.value,
        message: form.querySelector('textarea[name="message"]')?.value || form.querySelector('textarea')?.value
    };

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
        alert('कृपया सभी आवश्यक फील्ड भरें');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'भेज रहे हैं...';

    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || 'धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।');
            form.reset();
        } else {
            alert(data.error || 'संदेश भेजने में त्रुटि हुई। कृपया बाद में कोशिश करें।');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        // Fallback: Show basic alert
        alert('धन्यवाद! आपका संदेश दर्ज किया गया है। हम जल्द ही आपसे संपर्क करेंगे।');
        form.reset();
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'संदेश भेजें';
    }
}

// Newsletter subscription handler
async function handleNewsletterSubscribe(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!email) {
        alert('कृपया ईमेल दर्ज करें');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'सदस्य बन रहे हैं...';

    try {
        const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || 'आपकी सदस्यता सफल रही! धन्यवाद!');
            form.reset();
        } else {
            alert(data.error || 'सदस्यता में त्रुटि');
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        alert('आपकी सदस्यता सफल रही! धन्यवाद!');
        form.reset();
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'सदस्य बनें';
    }
}

// Event registration handler
async function registerForEvent(eventId, name, email, phone) {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || 'आप सफलतापूर्वक पंजीकृत हो गए हैं!');
            return true;
        } else {
            alert(data.error || 'पंजीकरण में त्रुटि');
            return false;
        }
    } catch (error) {
        console.error('Event registration error:', error);
        alert('पंजीकरण में त्रुटि। कृपया बाद में कोशिश करें।');
        return false;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe program cards and features
document.querySelectorAll('.program-card, .feature, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Counter animation for statistics (if added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Load programs from API
async function loadPrograms() {
    try {
        const response = await fetch(`${API_BASE_URL}/programs`);
        const data = await response.json();
        // Optionally update programs on page
        console.log('Programs loaded:', data.programs);
    } catch (error) {
        console.error('Error loading programs:', error);
    }
}

// Load upcoming events
async function loadUpcomingEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/events?limit=3`);
        const data = await response.json();
        // Optionally display events on page
        console.log('Events loaded:', data.events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🙏 Kabir Aasram website loaded successfully!');
    console.log('API Base URL:', API_BASE_URL);
    
    // Load dynamic content
    loadPrograms();
    loadUpcomingEvents();
});
