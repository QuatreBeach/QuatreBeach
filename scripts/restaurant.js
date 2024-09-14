document.getElementById('reserveren-link').addEventListener('click', function(event) {
    event.preventDefault(); // Voorkom de standaardactie als dat nodig is
    const reserverenTekst = document.getElementById('reserveren-tekst');
    
    // Wijzig de tekst
    reserverenTekst.textContent = "Ga verder in de widget rechtsonder";
    
    // Voeg de pulse-animatie toe
    reserverenTekst.classList.add('pulse-animation');
    
    // Verwijder de animatieklasse na 0.5 seconden zodat deze opnieuw kan worden getriggerd
    setTimeout(function() {
      reserverenTekst.classList.remove('pulse-animation');
    }, 2500);
  });
  
  // Maak een array met de URL's van de achtergrondafbeeldingen
const backgrounds = [
  '../images/achtergronden/restaurant/1.jepg',
  '../images/achtergronden/restaurant/2.jpg',
  '../images/achtergronden/restaurant/3.jpg',
  '../images/achtergronden/restaurant/4.jpg',
  '../images/achtergronden/restaurant/5.jpg',
  '../images/achtergronden/restaurant/6.jpg',
  '../images/achtergronden/restaurant/7.jpeg'
];

// Selecteer willekeurig een afbeelding
const randomIndex = Math.floor(Math.random() * backgrounds.length);

// Stel de geselecteerde afbeelding in als achtergrond van het element
document.querySelector('#pagina-restaurant #welkom-wrapper').style.backgroundImage = `url(${backgrounds[randomIndex]})`;
