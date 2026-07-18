// URL se place data lo
const urlParams = new URLSearchParams(window.location.search);
const placeName = urlParams.get('place');

const placesData = {
  goa: {
    name: "Goa",
    info: "⭐ 4.8 | 🏖️ Beach | 📍 India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&fit=crop",
    about: "Goa is India's smallest state, famous for its stunning beaches, vibrant nightlife, and Portuguese heritage.",
    highlights: [
      "✅ Best Time: October to March",
      "✅ Language: Konkani, English, Hindi",
      "✅ Famous Food: Fish Curry, Bebinca",
      "✅ Top Beaches: Baga, Calangute, Anjuna",
      "✅ Water Sports: Parasailing, Scuba Diving"
    ],
    price: "₹8,000"
  },
  manali: {
    name: "Manali",
    info: "⭐ 4.7 | 🏔️ Mountain | 📍 India",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&fit=crop",
    about: "Manali is a high-altitude Himalayan resort town in Himachal Pradesh, gateway to skiing and trekking.",
    highlights: [
      "✅ Best Time: October to June",
      "✅ Language: Hindi, Manali",
      "✅ Famous Food: Siddu, Trout Fish",
      "✅ Top Spots: Rohtang Pass, Solang Valley",
      "✅ Adventure: Skiing, Paragliding, Trekking"
    ],
    price: "₹10,000"
  },
  jaipur: {
    name: "Jaipur",
    info: "⭐ 4.6 | 🏯 Heritage | 📍 India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1600&fit=crop",
    about: "Jaipur, the Pink City, is the capital of Rajasthan known for stunning forts and vibrant culture.",
    highlights: [
      "✅ Best Time: November to February",
      "✅ Language: Hindi, Rajasthani",
      "✅ Famous Food: Dal Baati Churma",
      "✅ Top Spots: Amber Fort, Hawa Mahal",
      "✅ Shopping: Johari Bazaar"
    ],
    price: "₹7,000"
  },
  kerala: {
    name: "Kerala",
    info: "⭐ 4.9 | 🏖️ Beach | 📍 India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&fit=crop",
    about: "Kerala, God's Own Country, is famous for backwaters, beaches, Ayurveda, and lush greenery.",
    highlights: [
      "✅ Best Time: September to March",
      "✅ Language: Malayalam",
      "✅ Famous Food: Appam, Fish Molee",
      "✅ Top Spots: Alleppey, Munnar",
      "✅ Activities: Houseboat, Ayurveda Spa"
    ],
    price: "₹9,000"
  },
  shimla: {
    name: "Shimla",
    info: "⭐ 4.5 | 🏔️ Mountain | 📍 India",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&fit=crop",
    about: "Shimla is the capital of Himachal Pradesh, known for colonial architecture and snow-capped mountains.",
    highlights: [
      "✅ Best Time: March to June",
      "✅ Language: Hindi, Pahari",
      "✅ Famous Food: Chha Gosht, Babru",
      "✅ Top Spots: Mall Road, Jakhu Temple",
      "✅ Activities: Toy Train, Skiing"
    ],
    price: "₹6,000"
  },
  agra: {
    name: "Agra",
    info: "⭐ 4.7 | 🏯 Heritage | 📍 India",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&fit=crop",
    about: "Agra is home to the magnificent Taj Mahal, one of the Seven Wonders of the World.",
    highlights: [
      "✅ Best Time: October to March",
      "✅ Language: Hindi, Urdu",
      "✅ Famous Food: Petha, Mughlai Cuisine",
      "✅ Top Spots: Taj Mahal, Agra Fort",
      "✅ Activities: Sunrise Taj Visit"
    ],
    price: "₹5,000"
  },
  ranthambore: {
    name: "Ranthambore",
    info: "⭐ 4.6 | 🐯 Wildlife | 📍 India",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&fit=crop",
    about: "Ranthambore National Park is one of India's finest tiger reserves in Rajasthan.",
    highlights: [
      "✅ Best Time: October to June",
      "✅ Language: Hindi, Rajasthani",
      "✅ Famous Food: Dal Baati, Laal Maas",
      "✅ Top Spots: Zone 3, 4, 5 Safari",
      "✅ Animals: Tiger, Leopard, Crocodile"
    ],
    price: "₹12,000"
  },
  varanasi: {
    name: "Varanasi",
    info: "⭐ 4.8 | 🏯 Heritage | 📍 India",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=1600&fit=crop",
    about: "Varanasi is one of the world's oldest living cities and Hinduism's most sacred place.",
    highlights: [
      "✅ Best Time: October to March",
      "✅ Language: Hindi, Bhojpuri",
      "✅ Famous Food: Kachori Sabzi, Lassi",
      "✅ Top Spots: Dashashwamedh Ghat",
      "✅ Activities: Ganga Aarti, Boat Ride"
    ],
    price: "₹6,500"
  }
};

const place = placesData[placeName];

if(place) {
  document.getElementById('placeName').textContent = place.name;
  document.getElementById('placeInfo').textContent = place.info;
  document.getElementById('placeAbout').textContent = place.about; // ✅ ADD THIS
  // ... baaki same
}
 
  document.getElementById('placePrice').innerHTML = 
    place.price + ' <span>/ person</span>';

  document.getElementById('placeHero').style.background = `
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('${place.image}') center/cover no-repeat
  `;

  const highlightsList = document.getElementById('placeHighlights');
  place.highlights.forEach(function(item) {
    const li = document.createElement('li');
    li.textContent = item;
    highlightsList.appendChild(li);
  });


const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : window.location.origin;

// BOOKING LOGIC — API SE CONNECT!
document.querySelector('.book-btn').addEventListener('click', async function() {
  const checkin = document.querySelector('input[type="date"]:nth-of-type(1)').value;
  const checkout = document.querySelector('input[type="date"]:nth-of-type(2)').value;
  const guests = document.querySelector('select').value;

  if(checkin === '' || checkout === '') {
    alert('❌ Please select dates!');
    return;
  }

  if(checkout <= checkin) {
    alert('❌ Check Out must be after Check In!');
    return;
  }

  try {
    // Backend API call!
    const response = await fetch(`${API_BASE_URL}/api/bookings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        place: place.name,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        amount: place.price
      })
    });

    const data = await response.json();

    if(response.ok) {
      // Confirmation page pe bhejo
      const params = new URLSearchParams({
        id: data.booking.id,
        place: data.booking.place,
        checkin: data.booking.checkin,
        checkout: data.booking.checkout,
        guests: data.booking.guests,
        amount: data.booking.amount
      });
      window.location.href = 'booking-confirm.html?' + params.toString();
    }

  } catch (error) {
    console.error('Booking error:', error);
    alert('❌ Booking failed! Server not running?');
  }
});