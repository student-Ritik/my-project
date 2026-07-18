const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');

if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();

    cards.forEach(function(card) {
      const cardName = card.getAttribute('data-name');

      if(searchText === '' || cardName.includes(searchText)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Admin floating button check
const isAdmin = sessionStorage.getItem('isAdmin');
const adminFloat = document.getElementById('adminFloat');

if(isAdmin === 'true' && adminFloat) {
  adminFloat.style.display = 'block';
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(console.error);
  });
}