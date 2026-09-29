// Har rang: [glow RGB, shade-1, shade-2, bulb core, button text]
const themes = {
  yellow: ['255,214,110', '#ffcf5c', '#f0a92e', '#fff4c2', '#201600'],
  red:    ['255,90,90',   '#ff7a7a', '#d62c2c', '#ffe0e0', '#3a0808'],
  pink:   ['255,105,180', '#ff86c1', '#e0358a', '#ffe0f0', '#3a0620'],
  purple: ['170,110,255', '#b98cff', '#7a3fe0', '#eee0ff', '#1c0745'],
  blue:   ['90,170,255',  '#6bb5ff', '#2a6fd6', '#e0f0ff', '#06182f'],
  cyan:   ['60,220,235',  '#6eeaf5', '#1fa7bd', '#dcfcff', '#04262c'],
  green:  ['80,220,140',  '#6fe8a4', '#24a765', '#dcffec', '#04261a']
};

const dots = document.querySelectorAll('.dot');

function setTheme(name) {
  const t = themes[name];
  if (!t) return;

  const s = document.documentElement.style;
  s.setProperty('--rgb', t[0]);
  s.setProperty('--shade-1', t[1]);
  s.setProperty('--shade-2', t[2]);
  s.setProperty('--core', t[3]);
  s.setProperty('--btn-text', t[4]);

  dots.forEach(function (d) {
    d.classList.toggle('active', d.dataset.c === name);
  });

  try { localStorage.setItem('lampTheme', name); } catch (e) {}
}

dots.forEach(function (d) {
  d.addEventListener('click', function () { setTheme(d.dataset.c); });
});

// Page khulte hi pichla chuna hua rang lagao (nahi mila to yellow)
let saved = 'yellow';
try { saved = localStorage.getItem('lampTheme') || 'yellow'; } catch (e) {}
setTheme(saved);

const installButton = document.getElementById('install-app');
let deferredInstallPrompt = null;

if (installButton) {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  installButton.hidden = Boolean(isStandalone);

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  installButton.addEventListener('click', async function () {
    if (!deferredInstallPrompt) {
      const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
      alert(isIos
        ? 'Safari ke Share menu se Add to Home Screen chunein.'
        : 'App install ke liye HTTPS website kholen, phir browser menu se Install app chunein.');
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  });

  window.addEventListener('appinstalled', function () {
    installButton.hidden = true;
    deferredInstallPrompt = null;
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').catch(function (error) {
      console.error('Service worker registration failed:', error);
    });
  });
}

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  loginError.hidden = true;

  const submitButton = loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('pass').value
      })
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || 'Login nahi ho paya.');
    window.location.assign('/');
  } catch (error) {
    loginError.textContent = error.message || 'Backend se sampark nahi ho paya.';
    loginError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});