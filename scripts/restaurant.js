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
  