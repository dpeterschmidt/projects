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

// ========== Browser Notifications ==========

const enableBrowserNotificationsBtn = document.getElementById('enableBrowserNotifications');
const browserNotificationStatus = document.getElementById('browserNotificationStatus');
let notificationsEnabled = false;

// Check initial notification permission status
function updateNotificationButtonState() {
    if (!('Notification' in window)) {
        enableBrowserNotificationsBtn.disabled = true;
        browserNotificationStatus.textContent = 'Browser notifications not supported';
        browserNotificationStatus.classList.add('error');
        return;
    }

    if (Notification.permission === 'granted') {
        notificationsEnabled = true;
        enableBrowserNotificationsBtn.disabled = true;
        enableBrowserNotificationsBtn.textContent = 'Notifications Enabled ✓';
        browserNotificationStatus.textContent = 'You will receive browser notifications';
        browserNotificationStatus.classList.add('success');
    } else if (Notification.permission === 'denied') {
        enableBrowserNotificationsBtn.disabled = true;
        browserNotificationStatus.textContent = 'Notifications blocked. Please enable in browser settings.';
        browserNotificationStatus.classList.add('error');
    }
}

// Request notification permission
enableBrowserNotificationsBtn.addEventListener('click', async () => {
    if (!('Notification' in window)) {
        alert('Browser notifications are not supported in your browser');
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            notificationsEnabled = true;
            new Notification('Shared Live Timer', {
                body: 'Browser notifications enabled! You will be notified of timer events.',
                icon: '🔔'
            });
            updateNotificationButtonState();
        } else {
            browserNotificationStatus.textContent = 'Notification permission denied';
            browserNotificationStatus.classList.add('error');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        browserNotificationStatus.textContent = 'Error enabling notifications';
        browserNotificationStatus.classList.add('error');
    }
});

// Send browser notification
function sendBrowserNotification(title, body) {
    if (notificationsEnabled && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '⏱️',
            requireInteraction: false
        });
    }
}

// Listen for timer events and send notifications
let lastTimerState = null;

socket.on('timerUpdate', (state) => {
    // Check if timer just started
    if (state.isRunning && (!lastTimerState || !lastTimerState.isRunning)) {
        const minutes = Math.floor(state.duration / 60);
        const seconds = state.duration % 60;
        let timeStr = '';
        if (minutes > 0) {
            timeStr = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            if (seconds > 0) timeStr += ` ${seconds} second${seconds !== 1 ? 's' : ''}`;
        } else {
            timeStr = `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
        sendBrowserNotification('Timer Started', `Timer started for ${timeStr}`);
    }
    // Check if timer was stopped
    else if (!state.isRunning && lastTimerState && lastTimerState.isRunning) {
        sendBrowserNotification('Timer Stopped', 'The timer has been stopped');
    }

    lastTimerState = state;
});

socket.on('timerComplete', () => {
    sendBrowserNotification('Timer Completed!', 'The timer has finished');
});

// Initialize notification button state
updateNotificationButtonState();

// ========== Telegram Bot Info ==========

const botUsernameElement = document.getElementById('botUsername');

// Fetch bot info from server
fetch('/api/bot-info')
    .then(response => response.json())
    .then(data => {
        if (data.available && data.username) {
            botUsernameElement.textContent = `@${data.username}`;
        } else {
            botUsernameElement.textContent = 'Bot not configured';
            botUsernameElement.style.color = '#999';
        }
    })
    .catch(error => {
        console.error('Error fetching bot info:', error);
        botUsernameElement.textContent = 'Error loading bot info';
        botUsernameElement.style.color = '#e74c3c';
    });
