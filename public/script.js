const socket = io();

// DOM elements
const timerDisplay = document.getElementById('timerDisplay');
const timeElement = timerDisplay.querySelector('.time');
const statusElement = document.getElementById('status');
const statusText = statusElement.querySelector('.status-text');
const durationInput = document.getElementById('duration');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const presetBtns = document.querySelectorAll('.preset-btn');

let localInterval = null;
let currentEndTime = null;

// Preset button event listeners
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const seconds = parseInt(btn.getAttribute('data-seconds'));
        durationInput.value = seconds;
        socket.emit('startTimer', seconds);
    });
});

// Button event listeners
startBtn.addEventListener('click', () => {
    const duration = parseInt(durationInput.value);
    if (duration > 0) {
        socket.emit('startTimer', duration);
    } else {
        alert('Please enter a valid duration (must be greater than 0)');
    }
});

stopBtn.addEventListener('click', () => {
    socket.emit('stopTimer');
});

resetBtn.addEventListener('click', () => {
    socket.emit('resetTimer');
});

// Socket event listeners
socket.on('timerUpdate', (state) => {
    updateUI(state);
});

socket.on('timerComplete', () => {
    playNotification();
    updateStatusText('Timer completed!');
    setTimeout(() => {
        updateStatusText('Ready to start');
    }, 3000);
});

// Update UI based on timer state
function updateUI(state) {
    if (state.isRunning) {
        currentEndTime = Date.now() + (state.remaining * 1000);
        startLocalTimer();
        updateStatusText('Timer running...');
        statusElement.classList.add('running');
        statusElement.classList.remove('stopped');
        startBtn.disabled = true;
        stopBtn.disabled = false;
        durationInput.disabled = true;
        presetBtns.forEach(btn => btn.disabled = true);
    } else {
        stopLocalTimer();
        updateDisplay(0);
        updateStatusText('Ready to start');
        statusElement.classList.remove('running');
        statusElement.classList.add('stopped');
        startBtn.disabled = false;
        stopBtn.disabled = true;
        durationInput.disabled = false;
        presetBtns.forEach(btn => btn.disabled = false);
    }
}

// Start local countdown display
function startLocalTimer() {
    stopLocalTimer();

    localInterval = setInterval(() => {
        if (currentEndTime) {
            const remaining = Math.max(0, Math.ceil((currentEndTime - Date.now()) / 1000));
            updateDisplay(remaining);

            if (remaining === 0) {
                stopLocalTimer();
            }
        }
    }, 100);
}

// Stop local countdown display
function stopLocalTimer() {
    if (localInterval) {
        clearInterval(localInterval);
        localInterval = null;
    }
}

// Update timer display
function updateDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const timeString = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');

    timeElement.textContent = timeString;
}

// Update status text
function updateStatusText(text) {
    statusText.textContent = text;
}

// Play notification sound (visual feedback)
function playNotification() {
    timerDisplay.style.animation = 'none';
    setTimeout(() => {
        timerDisplay.style.animation = 'flash 0.5s ease-in-out 3';
    }, 10);
}

// Add flash animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Connection status
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    updateStatusText('Connection lost. Reconnecting...');
});

socket.on('reconnect', () => {
    console.log('Reconnected to server');
});

// ========== Discord Webhook Status ==========

const discordStatusElement = document.getElementById('discordStatus');

// Check Discord webhook configuration status
fetch('/api/discord-status')
    .then(response => response.json())
    .then(data => {
        if (data.configured) {
            discordStatusElement.textContent = 'Configured ✓';
            discordStatusElement.classList.add('configured');
            discordStatusElement.classList.remove('not-configured');
        } else {
            discordStatusElement.textContent = 'Not configured';
            discordStatusElement.classList.add('not-configured');
            discordStatusElement.classList.remove('configured');
        }
    })
    .catch(error => {
        console.error('Error fetching Discord status:', error);
        discordStatusElement.textContent = 'Error checking status';
        discordStatusElement.classList.add('not-configured');
    });
