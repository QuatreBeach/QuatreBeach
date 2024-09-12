const sheetID = '1lwm28y3f2lMnqjKdIZtK5Cyceanfty5fJYHTmTRN4kM'; // Vervang dit door de ID van je Google Sheet
const apiKey = 'AIzaSyA2sGmvCwNNTlkFWxT-Mg4TYrsgNvpX7pc'; // Vervang dit door je Google API Key
const range = 'Agenda!A2:E'; // Aangepast naar jouw range, beginnend vanaf A2

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

document.addEventListener('DOMContentLoaded', function () {
  const todaySection = document.querySelector('#today-events .events-list'); // Voor evenementen van vandaag
  const geenEventsSection = document.getElementById('geen-events'); // Fallback sectie voor geen evenementen

  // Verwijder eventuele bestaande evenement-content
  todaySection.innerHTML = '';
  geenEventsSection.style.display = 'none'; // Verberg standaard de 'geen evenementen' sectie

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const now = new Date();
      const upcomingEvents = [];

      data.values.forEach(row => {
        const [name, date, time, text, imageName] = row;

        // Verwerk datum en tijd
        const [day, month] = date.split('-');
        const [hours, minutes] = time.split(':');
        const eventDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));

        // Bereken de eindtijd van het evenement (3 uur na de starttijd)
        const eventEndTime = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

        // Controleer of het evenement nog niet is afgelopen (3 uur na starttijd)
        if (eventEndTime > now) {
          upcomingEvents.push({
            name: name,
            date: eventDate,
            endTime: eventEndTime,
            time: time,
            text: text,
            imageName: imageName
          });
        }
      });

      // Als er geen evenementen zijn
      if (upcomingEvents.length === 0) {
        geenEventsSection.style.display = 'block'; // Toon de 'geen evenementen' sectie
        document.getElementById('today-events').style.display = 'none'; // Verberg de evenementen-sectie
      } else {
        // Zorg ervoor dat de evenementen-sectie zichtbaar is
        document.getElementById('today-events').style.display = 'block';

        // Sorteer de evenementen op datum en tijd
        upcomingEvents.sort((a, b) => a.date - b.date);

        // Toon de twee eerstvolgende evenementen
        upcomingEvents.slice(0, 2).forEach(event => {
          const template = document.getElementById('event-template').content.cloneNode(true);

          // Vul de template met gegevens
          template.querySelector('h4').textContent = event.name;
          template.querySelector('.event-date-time').textContent = `${formatDate(event.date)} v.a. ${event.time}`;
          template.querySelector('.event-description').textContent = event.text;

          // Formeer het pad voor de afbeelding
          const imageUrl = `images/agenda/${event.imageName}.png`;
          template.querySelector('.event-image img').src = imageUrl;
          template.querySelector('.event-image img').alt = event.name;


          const reserveButton = template.querySelector('.reserve-button');

          // "Nu bezig" logica: als het evenement is gestart en nog bezig is
          const now = new Date();
          if (now >= event.date && now <= event.endTime) {
            template.querySelector('.now-live').style.display = 'flex'; // Toon "nu bezig"
            reserveButton.style.pointerEvents = 'none'; // Uitschakelen van de knop
            reserveButton.style.display = 'none'; // Verberg de reserveer-knop
          } else {
            template.querySelector('.now-live').style.display = 'none'; // Verberg "nu bezig"
            reserveButton.style.pointerEvents = 'auto'; // Activeer de knop
            reserveButton.style.display = 'block'; // Toon de reserveer-knop
          }

          const formattedDate = formatForURL(event.date);
          const bookingUrl = `https://bookings.zenchef.com/results?rid=368690&pid=1001&isPreview=1&day=${formattedDate}`;
          reserveButton.href = bookingUrl;
          reserveButton.target = '_blank'; // Open in een nieuwe tab

          // Voeg het evenement toe aan de sectie
          todaySection.appendChild(template);
        });
      }
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Functie om de datum te formatteren als "2 september" zonder jaartal
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'
  ];
  return `${day} ${months[month]}`;
}

// Functie om datum te formatteren naar YYYY-MM-DD voor de reserverings-URL
function formatForURL(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Maand is 0-gebaseerd
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}