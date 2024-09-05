let lastScrollTop = 0; // Houdt de vorige scrollpositie bij
const header = document.querySelector('header'); // Selecteert de eerste header op de pagina
const scrollThreshold = 100; // Hoogte waarop de achtergrondkleur moet veranderen

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > scrollThreshold) {
        // Voeg achtergrondkleur toe als je verder dan scrollThreshold hebt gescrold
        header.style.backgroundColor = 'var(--groen)'; // Kies een kleur en transparantie die bij je ontwerp past
    } else {
        // Verwijder achtergrondkleur als je minder dan scrollThreshold hebt gescrold
        header.style.backgroundColor = 'transparent';
    }
    
    if (currentScroll > lastScrollTop) {
        // Scroll naar beneden
        header.style.transform = 'translateY(-200%)'; // Verplaatst de header naar boven
        header.style.opacity = '0'; // Verbergt de header
    } else {
        // Scroll naar boven
        header.style.transform = 'translateY(0)'; // Zet de header terug naar zijn oorspronkelijke positie
        header.style.opacity = '1'; // Toont de header
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Voor mobiel scrolen
});


// MOBIEL MENU


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Open of sluit de sidebar en verander de hamburger naar kruisje
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
});


