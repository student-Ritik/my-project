// Admin protection
if(sessionStorage.getItem('isAdmin') !== 'true') {
  alert('❌ Access Denied! Admins Only!');
  window.location.href = 'login.html';
}

// Logout
document.querySelector('.logout-btn')
  .addEventListener('click', function() {
    sessionStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
});

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : window.location.origin;

// Backend API se bookings fetch karo!
async function loadAdminData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings/stats`);
    const data = await response.json();

    // Stats update karo
    document.getElementById('totalBookings').textContent = 
      data.totalBookings;
    document.getElementById('totalRevenue').textContent = 
      '₹' + data.totalRevenue.toLocaleString('en-IN');

    // Table fill karo
    const tableBody = document.getElementById('bookingsTable');

    if(data.bookings.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" 
            style="text-align:center; 
                   padding:30px; color:#888">
            No bookings yet!
          </td>
        </tr>
      `;
    } else {
      data.bookings.forEach(function(booking, index) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${booking.id}</td>
          <td>Guest ${index + 1}</td>
          <td>${booking.place}</td>
          <td>${booking.checkin}</td>
          <td>${booking.amount}</td>
          <td>
            <span class="status confirmed">
              ${booking.status}
            </span>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

  } catch(error) {
    console.error('Admin data error:', error);
  }
}

// Load karo!
loadAdminData();