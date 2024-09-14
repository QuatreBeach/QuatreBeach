document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('.ons-tekst p');

    const setParagraphVisibility = () => {
        paragraphs.forEach(p => {
            const rect = p.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Zorg ervoor dat de opacity al volledig is als de paragraaf bijvoorbeeld voor 50% zichtbaar is
            const threshold = 0.5; // Opacity volledig bij 50% zichtbaarheid
            
            // Bereken de zichtbaarheid en zorg dat de opacity eerder 1 is
            const visibilityRatio = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
            
            // Verhoog de ratio, zodat de opacity sneller 1 wordt (bij bijvoorbeeld 50% zichtbaarheid)
            const adjustedOpacity = Math.min(1, visibilityRatio / threshold);

            // Stel de opacity in
            p.style.opacity = adjustedOpacity;
        });
    };

    window.addEventListener('scroll', setParagraphVisibility);
    setParagraphVisibility(); // Call on load to set initial visibility
});




const folderPath = 'images/impressie/'; // Pad naar de map met afbeeldingen
const numberOfImages = 47; // Aantal afbeeldingen in de map
const fotoGrid = document.getElementById('fotoGrid');

// Functie om afbeeldingen dynamisch toe te voegen
for (let i = 1; i <= numberOfImages; i++) {
  const img = document.createElement('img');
  img.src = `${folderPath}image${i}.jpeg`; // Verwijzing naar de afbeelding
  img.alt = `Impressie ${i}`; // Alternatieve tekst
  img.classList.add('foto-item'); // Voeg een CSS klasse toe aan de afbeelding
  
  // Voeg de afbeelding toe aan de grid
  fotoGrid.appendChild(img);
}

