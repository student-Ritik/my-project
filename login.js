const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : window.location.origin;

// TABS LOGIC
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', function() {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', function() {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

// LOGIN
document.getElementById('loginBtn').addEventListener('click', async function() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');

  if(email === '' || password === '') {
    msg.style.color = '#e94560';
    msg.textContent = '❌ Please fill all fields!';
    return;
  }

  msg.style.color = '#888';
  msg.textContent = '⏳ Logging in...';

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if(response.ok) {
      msg.style.color = '#00c853';
      msg.textContent = '✅ ' + data.message;

      // Token save karo
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('userEmail', email);

      if(data.role === 'admin') {
        sessionStorage.setItem('isAdmin', 'true');
        setTimeout(() => window.location.href = 'admin.html', 1500);
      } else {
        setTimeout(() => window.location.href = 'index.html', 1500);
      }
    } else {
      msg.style.color = '#e94560';
      msg.textContent = '❌ ' + data.message;
    }

  } catch(error) {
    msg.style.color = '#e94560';
    msg.textContent = '❌ Server error! Try again.';
  }
});

// SIGNUP
document.getElementById('signupBtn').addEventListener('click', async function() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const msg = document.getElementById('signupMsg');

  if(name === '' || email === '' || password === '') {
    msg.style.color = '#e94560';
    msg.textContent = '❌ Please fill all fields!';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    msg.style.color = '#e94560';
    msg.textContent = '❌ Please enter valid email!';
    return;
  }

  if(password.length < 6) {
    msg.style.color = '#e94560';
    msg.textContent = '❌ Password must be 6+ characters!';
    return;
  }

  msg.style.color = '#888';
  msg.textContent = '⏳ Creating account...';

  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if(response.ok) {
      msg.style.color = '#00c853';
      msg.textContent = '✅ Account created! Please login.';
      setTimeout(() => loginTab.click(), 1500);
    } else {
      msg.style.color = '#e94560';
      msg.textContent = '❌ ' + data.message;
    }

  } catch(error) {
    msg.style.color = '#e94560';
    msg.textContent = '❌ Server error! Try again.';
  }
});