// Saare filter buttons pakdo
const filterBtns = document.querySelectorAll('.filter-btn');

// Saare destination cards pakdo
const destCards = document.querySelectorAll('.dest-card');

// Har button pe click suno
filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {

    // Active class pehle sab se hatao
    filterBtns.forEach(function(b) {
      b.classList.remove('active');
    });

    // Clicked button ko active banao
    btn.classList.add('active');

    // Kaunsa filter select hua?
    const filter = btn.getAttribute('data-filter');

    // Har card check karo
    destCards.forEach(function(card) {
      const category = card.getAttribute('data-category');

      if(filter === 'all' || category === filter) {
        card.style.display = '';      // Dikho!
      } else {
        card.style.display = 'none'; // Chhupo!
      }
    });

  });
});