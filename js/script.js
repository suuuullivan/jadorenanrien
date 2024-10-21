// Configuration du compte à rebours : 24 heures (en secondes)
let countdownTime = 24 * 60 * 60; // 86400 secondes

// Sélection des éléments du DOM
const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const gifElement = document.getElementById('countdown-gif');

// Fonction pour démarrer le compte à rebours ou continuer là où il s'était arrêté
function startCountdown() {
    // Récupérer l'heure de fin enregistrée dans le Local Storage
    countdownEndTime = localStorage.getItem('countdownEndTime');
    
    if (countdownEndTime) {
        const now = Date.now();
        const timeRemaining = (countdownEndTime - now) / 1000;
        
        if (timeRemaining > 0) {
            countdownTime = Math.floor(timeRemaining); // Mise à jour du temps restant
        } else {
            displayMessage(); // Si le temps est écoulé, afficher directement le message
            return;
        }
    } else {
        // Si aucune heure de fin n'a été enregistrée, définir une nouvelle heure de fin
        countdownEndTime = Date.now() + countdownTime * 1000;
        localStorage.setItem('countdownEndTime', countdownEndTime);
    }

    const countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            // Convertir les secondes restantes en heures, minutes et secondes
            const hours = Math.floor(countdownTime / 3600);
            const minutes = Math.floor((countdownTime % 3600) / 60);
            const seconds = countdownTime % 60;

            countdownElement.textContent = `${hours} heures, ${minutes} minutes et ${seconds} secondes restantes`;
            countdownTime--;

            // Changement de couleur du fond en continu
            changeBackgroundColor();

            // Affichage du GIF pendant le compte à rebours
            gifElement.classList.remove('hidden');
        } else {
            clearInterval(countdownInterval);
            displayMessage();
        }
    }, 1000);
}

// Fonction pour changer la couleur de fond de manière continue
function changeBackgroundColor() {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
}

// Fonction pour afficher le message "Nan rien" et stopper les animations
function displayMessage() {
    countdownElement.classList.add('hidden');
    gifElement.classList.add('hidden');
    messageElement.classList.remove('hidden');
    
    document.body.style.backgroundColor = '#f0f0f0';
    messageElement.style.color = '#ff6347';

    localStorage.removeItem('countdownEndTime');
}

window.onload = startCountdown;
