let sessionTime = 20;
let breakTime = 5;

let timerMinutes = sessionTime;
let timerSeconds = 0;

let isRunning = false;
let isSession = true;

let interval;

const timer = document.getElementById("timer");
const mode = document.getElementById("mode");

const sessionLength = document.getElementById("sessionLength");
const breakLength = document.getElementById("breakLength");

const sessionInc = document.getElementById("sessionInc");
const sessionDec = document.getElementById("sessionDec");

const breakInc = document.getElementById("breakInc");
const breakDec = document.getElementById("breakDec");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
    let min = String(timerMinutes).padStart(2, '0');
    let sec = String(timerSeconds).padStart(2, '0');

    timer.innerText = `${min}:${sec}`;
}

function updateSettings() {
    sessionLength.innerText = `${sessionTime} min`;
    breakLength.innerText = `${breakTime} min`;

    if (!isRunning && isSession) {
        timerMinutes = sessionTime;
        timerSeconds = 0;
        updateDisplay();
    }
}

sessionInc.addEventListener("click", () => {
    if (!isRunning) {
        sessionTime++;
        updateSettings();
    }
});

sessionDec.addEventListener("click", () => {
    if (!isRunning && sessionTime > 1) {
        sessionTime--;
        updateSettings();
    }
});

breakInc.addEventListener("click", () => {
    if (!isRunning) {
        breakTime++;
        updateSettings();
    }
});

breakDec.addEventListener("click", () => {
    if (!isRunning && breakTime > 1) {
        breakTime--;
        updateSettings();
    }
});

startBtn.addEventListener("click", () => {

    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        startBtn.innerText = "Start";
        return;
    }

    isRunning = true;
    startBtn.innerText = "Pause";

    interval = setInterval(() => {

        if (timerSeconds === 0) {

            if (timerMinutes === 0) {

                if (isSession) {
                    isSession = false;
                    mode.innerText = "Break";
                    timerMinutes = breakTime;
                } else {
                    isSession = true;
                    mode.innerText = "Session";
                    timerMinutes = sessionTime;
                }

                timerSeconds = 0;

            } else {
                timerMinutes--;
                timerSeconds = 59;
            }

        } else {
            timerSeconds--;
        }

        updateDisplay();

    }, 1000);

});

resetBtn.addEventListener("click", () => {

    clearInterval(interval);

    sessionTime = 20;
    breakTime = 5;

    timerMinutes = sessionTime;
    timerSeconds = 0;

    isRunning = false;
    isSession = true;

    mode.innerText = "Session";
    startBtn.innerText = "Start";

    updateSettings();
    updateDisplay();

});

updateDisplay();