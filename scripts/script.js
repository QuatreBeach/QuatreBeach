const sheetID = '1lwm28y3f2lMnqjKdIZtK5Cyceanfty5fJYHTmTRN4kM'; // Vervang dit door de ID van je Google Sheet
const apiKey = 'AIzaSyA2sGmvCwNNTlkFWxT-Mg4TYrsgNvpX7pc'; // Vervang dit door je Google API Key
const range = 'Agenda!A2:E'; // Aangepast naar jouw range, beginnend vanaf A2

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

document.addEventListener('DOMContentLoaded', function() {
  const todaySection = document.getElementById('today-events');
  const thisMonthSection = document.getElementById('this-month-events');
  const laterSection = document.getElementById('later-events');
  const noEventsSection = document.getElementById('geen-events'); // Fallback voor geen evenementen
  
  // Verwijder eventuele bestaande evenement-content in de secties
  todaySection.querySelector('.events-list').innerHTML = '';
  thisMonthSection.querySelector('.events-list').innerHTML = '';
  laterSection.querySelector('.events-list').innerHTML = '';
  noEventsSection.style.display = 'none'; // Verberg standaard de 'geen evenementen' sectie

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000); // Einde van vandaag
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Begin volgende maand
      let eventAdded = false; // Controle of er evenementen zijn toegevoegd

      data.values.forEach(row => {
        const [name, date, time, text, imageName] = row;

        // Verwerk datum en tijd
        const [day, month] = date.split('-');
        const [hours, minutes] = time.split(':');
        const eventDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));

        const template = document.getElementById('event-template').content.cloneNode(true);

        // Vul de template met gegevens
        template.querySelector('h4').textContent = name;
        template.querySelector('.event-date-time').textContent = `${formatDate(date)} v.a. ${time}`;
        template.querySelector('.event-description').textContent = text;

        // Formeer het pad voor de afbeelding
        const imageUrl = `images/agenda/${imageName}`;
        template.querySelector('.event-image img').src = imageUrl;
        template.querySelector('.event-image img').alt = name;

        const reserveButton = template.querySelector('.reserve-button');

        // "Nu bezig" logica
        const threeHoursLater = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

        if (now >= eventDate && now <= threeHoursLater) {
          template.querySelector('.now-live').style.display = 'flex';
          reserveButton.style.pointerEvents = 'none'; // Uitschakelen van de knop
          reserveButton.style.display = 'none'; // Verander de opaciteit om aan te geven dat de knop niet interactief is
        } else {
          template.querySelector('.now-live').style.display = 'none';
          reserveButton.style.pointerEvents = 'auto'; // Zet de knop weer aan
          reserveButton.style.opacity = '1'; // Zet de opaciteit terug naar normaal

          // Voeg reserverings-URL toe aan de knop met de juiste datum in YYYY-MM-DD-formaat
          const formattedDate = formatForURL(eventDate);
          const bookingUrl = `https://bookings.zenchef.com/results?rid=368690&pid=1001&isPreview=1&day=${formattedDate}`;
          reserveButton.href = bookingUrl;
          reserveButton.target = '_blank'; // Open in een nieuwe tab
        }

        // Voeg het evenement toe aan de juiste sectie
        if (eventDate >= startOfDay && eventDate < endOfDay) {
          todaySection.querySelector('.events-list').appendChild(template);
          eventAdded = true;
        } else if (eventDate >= endOfDay && eventDate < startOfNextMonth) {
          thisMonthSection.querySelector('.events-list').appendChild(template);
          eventAdded = true;
        } else if (eventDate >= startOfNextMonth) {
          laterSection.querySelector('.events-list').appendChild(template);
          eventAdded = true;
        }
      });

      // Verberg secties zonder evenementen en toon fallback als er geen evenementen zijn
      if (todaySection.querySelector('.events-list').children.length === 0) {
        todaySection.style.display = 'none';
      }
      if (thisMonthSection.querySelector('.events-list').children.length === 0) {
        thisMonthSection.style.display = 'none';
      }
      if (laterSection.querySelector('.events-list').children.length === 0) {
        laterSection.style.display = 'none';
      }

      if (!eventAdded) {
        noEventsSection.style.display = 'block'; // Toon de fallback sectie als er geen evenementen zijn
      }
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Functie om de datum te formatteren als "2 september" zonder jaartal
function formatDate(dateString) {
  const [day, month] = dateString.split('-');

  if (!day || !month) {
    console.error('Ongeldige datumstring:', dateString);
    return 'Ongeldige datum';
  }

  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'
  ];

  const monthIndex = parseInt(month, 10) - 1; // Maandindex, -1 omdat arrays 0-gebaseerd zijn
  
  if (monthIndex >= 0 && monthIndex < months.length) {
    return `${parseInt(day, 10)} ${months[monthIndex]}`; // Alleen dag en maand
  } else {
    console.error('Ongeldige maandindex:', monthIndex);
    return 'Ongeldige datum';
  }
}

// Functie om datum te formatteren naar YYYY-MM-DD voor de reserverings-URL
function formatForURL(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Maand is 0-gebaseerd
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

document.getElementById('reserveren-link').addEventListener('click', function(event) {
  event.preventDefault(); // Voorkom de standaardactie als dat nodig is
  document.getElementById('reserveren-tekst').textContent = "Ga verder in de reserveringswidget";
});
