// Google Sheet gegevens
const sheetID = '1rkEHENBJQmg_Ru3_a8nuyKU83RvgQxDT82GmBhFjuJ4'; // Vervang dit door jouw sheet ID
const apiKey = 'AIzaSyA2sGmvCwNNTlkFWxT-Mg4TYrsgNvpX7pc'; // Vervang dit door jouw Google API-sleutel
const range = 'Vragen!A2:B'; // Pas aan naar jouw sheet range, met kolommen A (Vraag) en B (Antwoord)

// API URL genereren
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

// Functie om alle andere antwoorden in te klappen
function closeOtherAnswers(currentFaqAnswer) {
    const allAnswers = document.querySelectorAll('.faq-answer');
    allAnswers.forEach(answer => {
        if (answer !== currentFaqAnswer && answer.style.maxHeight) {
            answer.style.maxHeight = '0px';
            answer.previousElementSibling.classList.remove('open');
        }
    });
}

// Functie om de data op te halen en FAQ-items te genereren
async function loadFAQs() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const faqContainer = document.getElementById('faq-container');
        const rows = data.values;

        rows.forEach(row => {
            const [vraag, antwoord] = row;

            if (vraag && antwoord) {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');

                // Maak een h3 voor de vraag
                const faqQuestion = document.createElement('h3');
                faqQuestion.classList.add('faq-question');
                faqQuestion.innerHTML = `
                    <span>${vraag}</span>
                    <svg class="icon" alt="Like" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;

                // Maak een p-element voor het antwoord
                const faqAnswer = document.createElement('p');
                faqAnswer.classList.add('faq-answer');
                faqAnswer.innerHTML = antwoord.replace(/\n/g, '<br>'); // Handig voor meerdere regels

                // Voeg klik-event toe om het antwoord uit te klappen
                faqQuestion.addEventListener('click', () => {
                    const isOpen = faqQuestion.classList.contains('open');

                    if (isOpen) {
                        // Inklappen
                        faqAnswer.style.maxHeight = '0px';
                        faqQuestion.classList.remove('open');
                    } else {
                        // Eerst alle andere antwoorden inklappen
                        closeOtherAnswers(faqAnswer);

                        // Uitklappen van de huidige
                        const maxHeight = faqAnswer.scrollHeight * 2; // 2x de originele hoogte
                        faqAnswer.style.maxHeight = `${maxHeight}px`;
                        faqQuestion.classList.add('open');
                    }
                });

                faqItem.appendChild(faqQuestion);
                faqItem.appendChild(faqAnswer);
                faqContainer.appendChild(faqItem);
            }
        });
    } catch (error) {
        console.error('Fout bij het ophalen van de data: ', error);
    }
}

// FAQ's laden bij het opstarten van de pagina
loadFAQs();
