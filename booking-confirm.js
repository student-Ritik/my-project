// URL se booking data lo
const params = new URLSearchParams(window.location.search);

const id = params.get('id');
const place = params.get('place');
const checkin = params.get('checkin');
const checkout = params.get('checkout');
const guests = params.get('guests');
const amount = params.get('amount');

// Agar data nahi hai → wapas bhejo!
if(!id || !place || id === 'null') {
  window.location.href = 'destinations.html';
}

const bookingData = {
  id: id,
  place: place,
  checkin: checkin,
  checkout: checkout,
  guests: guests,
  amount: amount,
  date: new Date().toLocaleDateString(),
  status: 'Confirmed'
};

// Page mein fill karo
document.getElementById('bookingId').textContent = bookingData.id;
document.getElementById('confirmPlace').textContent = bookingData.place;
document.getElementById('confirmCheckin').textContent = bookingData.checkin;
document.getElementById('confirmCheckout').textContent = bookingData.checkout;
document.getElementById('confirmGuests').textContent = bookingData.guests;
document.getElementById('confirmAmount').textContent = bookingData.amount;

// LocalStorage mein save karo
const existingBookings = JSON.parse(
  localStorage.getItem('bookings') || '[]'
);
existingBookings.push(bookingData);
localStorage.setItem('bookings', JSON.stringify(existingBookings));