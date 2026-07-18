const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');

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
// Admin floating button check
const isAdmin = sessionStorage.getItem('isAdmin');
const adminFloat = document.getElementById('adminFloat');

if(isAdmin === 'true' && adminFloat) {
  adminFloat.style.display = 'block';
}