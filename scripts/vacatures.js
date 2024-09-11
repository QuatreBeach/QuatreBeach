document.addEventListener('DOMContentLoaded', () => {
    const words = ["collega", "chef", "barman", "barvrouw", 'keukenhulp', 'bediening', "gastheer", "gastvrouw", 'zomertopper'];
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