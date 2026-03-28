let total = 25 * 60, timeLeft = total, timerId = null;
const circumference = 2 * Math.PI * 130;
const bar = document.getElementById('progress-bar');
const timerDisp = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

function update() {
    const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
    timerDisp.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    bar.style.strokeDashoffset = circumference - (timeLeft / total) * circumference;
}

function start() {
    if (timerId) {
        clearInterval(timerId); timerId = null;
        startBtn.textContent = 'Resume';
        startBtn.style.background = 'var(--op-blue)';
    } else {
        startBtn.textContent = 'Pause';
        startBtn.style.background = 'var(--op-red)';
        timerId = setInterval(() => {
            timeLeft--; update();
            if (timeLeft <= 0) {
                clearInterval(timerId);
                new Notification("Time's Up!");
                reset();
            }
        }, 1000);
    }
}

function reset() {
    clearInterval(timerId); timerId = null;
    timeLeft = total; update();
    startBtn.textContent = 'Start';
    startBtn.style.background = 'var(--op-red)';
}

function setTimer(m) { total = m * 60; timeLeft = total; reset(); }

document.getElementById('notif-btn').onclick = () => Notification.requestPermission();
startBtn.onclick = start;
document.getElementById('reset-btn').onclick = reset;
bar.style.strokeDasharray = circumference;
update();