console.log('Script: Groet');

// GROET
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
document.getElementById("groet").textContent = greet;