console.log('Script: Maand');

// AGENDA MAAND
const months = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
const maand = new Date();
const monthName = months[maand.getMonth()];

document.getElementById("maand").textContent = monthName;