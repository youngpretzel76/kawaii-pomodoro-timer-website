let timer;
let minutes = 25;
let seconds = 0;
let isPaused = false;
let enteredTime = null;

const modal = document.getElementById('pomodoroModal');
const closemodalbutton = document.getElementById('closemodalbutton');

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement =
        document.getElementById('timer');
    timerElement.textContent =
        formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('take a break, your time is over!!')
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);

        modal.style.display = "flex";
    }
}

closemodalbutton.addEventListener("click", () => {
    modal.style.display = 'none';
});

function formatTime(minutes, seconds) {
    return`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function togglePauseResume() {
    const pauseResumeButton =
        document.querySelector('.control-buttons button');
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'resume';
    } else { 
        startTimer();
        pauseResumeButton.textContent = 'pause';
    }
}

function restartTimer() {
    clearInterval(timer);
    minutes = enteredTime || 25;
    seconds = 0;
    isPaused = false;
    const timerElement =
        document.getElementById('timer');
    timerElement.textContent =
        formatTime(minutes, seconds);
    const pauseResumeButton =
        document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = 'pause';
    startTimer();
}

function chooseTime() {
    const newTime = prompt('enter study time in minutes, please!');
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = false;
        const timerElement =
            document.getElementById('timer');
        timerElement.textContent =
            formatTime(minutes, seconds);
        clearInterval(timer);
        const pauseResumeButton =
            document.querySelector('.control-buttons button');
        pauseResumeButton.textContent = 'pause';
        startTimer();
        } else {
            alert('invalid! please put' + ' a valid number greater than 0!');
        }
}

startTimer();