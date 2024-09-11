console.log('Script: Openingstijden');

// Speciale behandeling voor zaterdag en zondag tussen 00:00 en 1:00
let adjustedToday = today;
if ((today === 0 || today === 6) && hours < 1) {
    adjustedToday = (today === 0) ? 6 : today - 1; // Gebruik de dag ervoor
}

const daysOfWeekShort = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

// Functie om een nieuwe datum te genereren gebaseerd op een offset
function getFormattedDate(date, offset) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + offset);
    const day = newDate.getDate();
    const month = newDate.toLocaleString('nl-NL', { month: 'short' });
    return `${day} ${month}`;
}

// Verwerk de openingstijden in de footer
const tableBody = document.querySelector('#openingstijden-footer tbody');
const rows = Array.from(tableBody.querySelectorAll('tr'));

// Verplaats de rijen zodat de dagen en tijden correct worden gesynchroniseerd
const reorderedRows = [];
for (let i = 0; i < rows.length; i++) {
    const dayIndex = (adjustedToday + i) % 7;
    const rowIndex = (dayIndex) % 7;
    const row = rows[rowIndex].cloneNode(true);
    const formattedDate = getFormattedDate(now, i); // Gebruik de juiste offset

    // Markeer 'Vandaag' en 'Morgen' met gouden kleur en dikgedrukt
    if (i === 0) {
        row.querySelector('td:first-child').innerHTML = `<strong class="highlight">Vandaag</strong>`;
        const openingTime = row.querySelector('td:last-child').textContent.split(' - ')[0];
        const closingTime = row.querySelector('td:last-child').textContent.split(' - ')[1];
        row.querySelector('td:last-child').innerHTML = `<strong style="color: #D4AF37;">${openingTime} - ${closingTime}</strong>`;
    } else if (i === 1) {
        row.querySelector('td:first-child').innerHTML = 'Morgen';
    } else {
        row.querySelector('td:first-child').innerHTML = `${daysOfWeekShort[dayIndex]} ${formattedDate}`;
    }

    // Controleer of de dag 'Maandag' is en stel de tijd in als 'Gesloten'
    if (dayIndex === 1) {
        row.querySelector('td:last-child').innerHTML = 'Gesloten';
    }

    // Aanpassing voor zaterdag en zondag tussen 00:00 en 1:00
    if ((dayIndex === 6 || dayIndex === 0) && hours < 1) {
        const closingTime = row.querySelector('td:last-child').textContent.split(' - ')[1];
        row.querySelector('td:last-child').innerHTML = `10:00 - ${closingTime}`;
    }

    reorderedRows.push(row);
}

// Verwijder alle bestaande rijen en voeg de nieuwe, geordende rijen toe
tableBody.innerHTML = '';
reorderedRows.forEach(row => tableBody.appendChild(row));



// Openingstijden agenda
const openingHours = [

    // Zondag
    [
        { start: '00:00', end: '00:59', message: 'Gaat zo sluiten om 01:00' },
        { start: '01:00', end: '08:59', message: 'Open vanaf 10:00' },
        { start: '09:00', end: '09:59', message: 'Gaat zo open om 10:00' },
        { start: '10:00', end: '21:59', message: 'Nu geopend tot 23:00' },
        { start: '22:00', end: '22:59', message: 'Gaat zo sluiten om 23:00' },
        { start: '23:00', end: '23:59', message: 'Nu gesloten' }
    ],
    
// Maandag
[{ start: '00:00', end: '23:59', message: 'Vandaag gesloten' }],
// Dinsdag
[
    { start: '00:00', end: '08:59', message: 'Open vanaf 10:00' },
    { start: '09:00', end: '09:59', message: 'Gaat zo open om 10:00' },
    { start: '10:00', end: '22:59', message: 'Nu geopend tot 00:00' },
    { start: '23:00', end: '23:59', message: 'Gaat zo sluiten om 00:00' }
],
// Woensdag
[
    { start: '00:00', end: '08:59', message: 'Open vanaf 10:00' },
    { start: '09:00', end: '09:59', message: 'Gaat zo open om 10:00' },
    { start: '10:00', end: '22:59', message: 'Nu geopend tot 00:00' },
    { start: '23:00', end: '23:59', message: 'Gaat zo sluiten om 00:00' }
],
// Donderdag
[
    { start: '00:00', end: '08:59', message: 'Open vanaf 10:00' },
    { start: '09:00', end: '09:59', message: 'Gaat zo open om 10:00' },
    { start: '10:00', end: '22:59', message: 'Nu geopend tot 00:00' },
    { start: '23:00', end: '23:59', message: 'Gaat zo sluiten om 00:00' }
],
// Vrijdag
[
    { start: '00:00', end: '08:59', message: 'Open vanaf 10:00' },
    { start: '09:00', end: '09:59', message: 'Gaat zo open om 10:00' },
    { start: '10:00', end: '23:59', message: 'Nu geopend tot 01:00' }
],
// Zaterdag
[
    { start: '00:00', end: '00:59', message: 'Gaat zo sluiten om 01:00' },
    { start: '01:00', end: '08:59', message: 'Open vanaf 10:00' },
    { start: '09:00', end: '09:59', message: 'Gaat zo open om 10:00' },
    { start: '10:00', end: '23:59', message: 'Nu geopend tot 01:00' }
]
];

function getOpeningHours() {
const dayOfWeek = now.getDay(); // 0 (zondag) t/m 6 (zaterdag)
const currentTime = now.toTimeString().substr(0, 5); // H:MM

const todayHours = openingHours[dayOfWeek];
let message = 'Gesloten';

for (const period of todayHours) {
    if (currentTime >= period.start && currentTime <= period.end) {
        message = period.message;
        break;
    }
}

return message;
}

document.getElementById('open-tekst').textContent = getOpeningHours();

// Controleer of het element met het id 'open-tekst2' bestaat
var element = document.getElementById('open-tekst2');

if (element) {
    // Als het element bestaat, voer dan de functie uit
    element.textContent = getOpeningHours();
}

