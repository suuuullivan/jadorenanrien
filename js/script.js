let countdownTime = 60 * 60;

const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('message');
const gifElement = document.getElementById('countdown-gif');

function startCountdown() {
    countdownEndTime = localStorage.getItem('countdownEndTime');
    
    if (countdownEndTime) {
        const now = Date.now();
        const timeRemaining = (countdownEndTime - now) / 1000;
        
        if (timeRemaining > 0) {
            countdownTime = Math.floor(timeRemaining); 
        } else {
            displayMessage(); 
            return;
        }
    } else {
        countdownEndTime = Date.now() + countdownTime * 1000;
        localStorage.setItem('countdownEndTime', countdownEndTime);
    }

    const countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            const hours = Math.floor(countdownTime / 3600);
            const minutes = Math.floor((countdownTime % 3600) / 60);
            const seconds = countdownTime % 60;

            countdownElement.textContent = `${hours} heures, ${minutes} minutes et ${seconds} secondes restantes`;
            countdownTime--;

            changeBackgroundColor();

            gifElement.classList.remove('hidden');
        } else {
            clearInterval(countdownInterval);
            displayMessage();
        }
    }, 1000);
}

function changeBackgroundColor() {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
}

function displayMessage() {
    countdownElement.classList.add('hidden');
    gifElement.classList.add('hidden');
    messageElement.classList.remove('hidden');
    
    document.body.style.backgroundColor = '#f0f0f0';
    messageElement.style.color = '#ff6347';

    localStorage.removeItem('countdownEndTime');
}

window.onload = startCountdown;
