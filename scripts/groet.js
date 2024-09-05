console.log('Script: Groet');

// GROET
// Haal de huidige datum en tijd op
const now = new Date();
const today = now.getDay();
const hours = now.getHours();
const time = now.getHours();
let greet;

if (time >= 18) {
    greet = 'Goedenavond';
} else if (time >= 12) {
    greet = 'Goedemiddag';
} else if (time >= 4) {
    greet = 'Goedemorgen';
} else {
    greet = 'Goedenacht';
}

// document.getElementById("groet").textContent = greet;
document.getElementById("groet-welkom").textContent = `${greet}, welkom bij`;