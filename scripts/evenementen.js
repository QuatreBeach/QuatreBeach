const sheetID = '15jvgVrFsx6OZU4H2jNuzWeoE0G9ofA50Qh2Obv8qDiQ'; // Jouw Google Sheet ID
const apiKey = 'AIzaSyA2sGmvCwNNTlkFWxT-Mg4TYrsgNvpX7pc'; // Jouw Google API Key
const range = 'Ruimtes!A2:C'; // De gegevens in kolommen A tot C, beginnend vanaf rij 2

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

document.addEventListener('DOMContentLoaded', function() {
  // Secties voor de dynamische inhoud
  const menuGrid = document.querySelector('.menu-grid');

  // Verwijder eventuele bestaande content in de sectie
  menuGrid.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.values || data.values.length === 0) {
        console.error('Geen gegevens gevonden in de sheet.');
        return;
      }

      data.values.forEach(row => {
        const [name, capacity, description] = row;

        // Extra checks voor ontbrekende gegevens
        if (!name || !capacity || !description) {
          console.error('Ontbrekende gegevens in rij:', row);
          return;
        }

        // Dynamisch overlay aanmaken per rij
        createOverlay(name, capacity, description);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Functie om het overlay-element voor elke ruimte te creëren
function createOverlay(title, capacity, description) {
  // Controleer of alle velden zijn ingevuld
  if (!title || !capacity || !description) {
    console.error(`Ontbrekende gegevens voor zaal: ${title}`);
    return; // Stop als er een veld ontbreekt
  }

  const overlaySection = document.createElement('a');
  
  // Stel de achtergrond in op de eerste afbeelding (image1.jpeg)
  const backgroundImagePath = `images/evenementen/${encodeURIComponent(title)}/image1.jpeg`;
  
  // Probeer de afbeelding te laden voordat het artikel wordt weergegeven
  const img = new Image();
  img.src = backgroundImagePath;
  
  img.onload = function() {
    // Alleen als de afbeelding succesvol wordt geladen, maken we het <article> element
    overlaySection.innerHTML = `
      <article style="background-image: url('${backgroundImagePath}'); background-size: cover; background-position: center;">
        <h3>${title}</h3>
      </article>
    `;

    // Voeg de onclick toe om de overlay te openen wanneer je op het artikel klikt
    overlaySection.onclick = () => openOverlay(title, description, capacity);

    document.querySelector('.menu-grid').appendChild(overlaySection);
  };

  img.onerror = function() {
    console.error(`Geen afbeeldingen gevonden in map: images/evenementen/${encodeURIComponent(title)}/`);
  };
}

// Functie om de overlay te openen en de afbeeldingen in te laden met het domino-effect
function openOverlay(title, description, capacity) {
  document.getElementById('overlay-title').textContent = title;
  document.getElementById('overlay-description').textContent = description;
  document.getElementById('overlay-capacity').textContent = `Groepen tot ${capacity} personen`;

  // Leeg de foto's sectie
  const overlayFotos = document.getElementById('overlay-fotos');
  overlayFotos.innerHTML = '';

  // Laad de afbeeldingen dynamisch uit de map
  const imageFolderPath = `images/evenementen/${encodeURIComponent(title)}/`;
  const numberOfImages = 16; // Probeer 5 afbeeldingen te laden

  for (let i = 1; i <= numberOfImages; i++) {
    const imgSrc = `${imageFolderPath}image${i}.jpeg`;
    const img = document.createElement('img');
    img.src = imgSrc;
    img.onerror = () => img.remove(); // Als de afbeelding niet bestaat, wordt deze verwijderd
    img.classList.add('carousel-image');
    
    // Voeg een animatievertraging toe om het domino-effect te creëren
    img.style.animationDelay = `${i * 0.1}s`; // Elke afbeelding krijgt 100ms vertraging

    overlayFotos.appendChild(img);
  }

  // Verberg het #menu-toggle element wanneer de overlay wordt geopend op schermen kleiner dan 450px
  if (window.innerWidth < 450) {
    document.getElementById('menu-toggle').style.display = 'none';
  }

  // Toon de overlay
  const overlay = document.getElementById('overlay');
  const overlayContent = document.querySelector('.overlay-content');
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlayContent.classList.add('show');
  }, 10);
}

// Functie om de overlay te sluiten
function closeOverlay(event) {
  const overlay = document.getElementById('overlay');
  const overlayContent = document.querySelector('.overlay-content');
  overlayContent.classList.remove('show');
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  
  // Toon het #menu-toggle element weer wanneer de overlay wordt gesloten, maar alleen op schermen kleiner dan 450px
  if (window.innerWidth < 450) {
    document.getElementById('menu-toggle').style.display = 'flex';
  }

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
}





document.addEventListener('DOMContentLoaded', () => {
  const words = ["evenement", "borrel", "feest", "teamuitje", 'verjaardag', 'bruiloft', 'diner', 'brunch', 'high tea', 'vergadering', 'babyshower', 'bedrijfsfeest'];
  let currentIndex = 0;
  const rotatingWordElement = document.getElementById('rotating-word');
  const wordWrapper = rotatingWordElement.parentElement;
  let shownWords = [];

  // Functie om een willekeurig woord te kiezen dat nog niet is getoond
  function chooseNextWord() {
      let nextIndex;
      do {
          nextIndex = Math.floor(Math.random() * words.length);
      } while (shownWords.includes(nextIndex));

      shownWords.push(nextIndex);
      if (shownWords.length === words.length) {
          shownWords = []; // Reset shownWords als alle woorden zijn getoond
      }

      return words[nextIndex];
  }

  // Stel het eerste woord en de breedte in bij het laden van de pagina
  rotatingWordElement.textContent = words[currentIndex];
  wordWrapper.style.width = rotatingWordElement.offsetWidth + 'px';
  shownWords.push(currentIndex);

  setInterval(() => {
      // Kies het volgende woord
      currentIndex = words.indexOf(chooseNextWord());
      const nextWord = words[currentIndex];
      rotatingWordElement.textContent = nextWord;
      const newWidth = rotatingWordElement.offsetWidth;

      // Stel de breedte van de wrapper in
      wordWrapper.style.width = newWidth + 'px';

      // Stel de huidige tekst terug en start de animatie opnieuw
      rotatingWordElement.style.animation = 'none'; // Stop animatie tijdelijk
      void rotatingWordElement.offsetHeight; // Trigger reflow
      rotatingWordElement.style.animation = ''; // Start animatie opnieuw
  }, 2000); // Tekst wisselt nu aan het einde van de animatiecyclus
});
