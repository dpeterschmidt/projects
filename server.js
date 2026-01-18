require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Discord webhook configuration
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

if (DISCORD_WEBHOOK_URL) {
  console.log('Discord webhook configured successfully');
} else {
  console.log('Discord webhook URL not provided. Discord notifications disabled.');
}

// Timer state
let timerState = {
  isRunning: false,
  endTime: null,
  duration: 0,
  startTime: null
};

let timerInterval = null;

// Rate limiting for Discord notifications
let lastDiscordNotificationTime = 0;
const DISCORD_RATE_LIMIT_MS = 2000; // Minimum 2 seconds between notifications

// Send Discord webhook notification
async function sendDiscordNotification(message) {
  if (!DISCORD_WEBHOOK_URL) {
    return;
  }

  // Rate limiting - prevent spam
  const now = Date.now();
  if (now - lastDiscordNotificationTime < DISCORD_RATE_LIMIT_MS) {
    console.log('Discord notification skipped due to rate limiting');
    return;
  }
  lastDiscordNotificationTime = now;

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        username: 'Shared Live Timer',
        avatar_url: 'https://cdn-icons-png.flaticon.com/512/2784/2784459.png'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to send Discord notification (${response.status}):`, errorText);

      if (response.status === 429) {
        console.error('Discord rate limit hit. Please wait before sending more notifications.');
      }
    } else {
      console.log('Discord notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending Discord notification:', error.message);
  }
}

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to check if Discord webhook is configured
app.get('/api/discord-status', (req, res) => {
  res.json({
    configured: !!DISCORD_WEBHOOK_URL
  });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Send current timer state to newly connected client
  socket.emit('timerUpdate', getCurrentTimerState());

  // Handle timer start
  socket.on('startTimer', (duration) => {
    if (!timerState.isRunning && duration > 0) {
      const durationMs = duration * 1000;
      timerState.isRunning = true;
      timerState.duration = duration;
      timerState.startTime = Date.now();
      timerState.endTime = Date.now() + durationMs;

      // Broadcast to all clients
      io.emit('timerUpdate', getCurrentTimerState());

      // Send Discord notification
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      let timeStr = '';
      if (minutes > 0) {
        timeStr = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        if (seconds > 0) timeStr += ` ${seconds} second${seconds !== 1 ? 's' : ''}`;
      } else {
        timeStr = `${seconds} second${seconds !== 1 ? 's' : ''}`;
      }
      sendDiscordNotification(`⏱️ Timer started for ${timeStr}`);

      // Clear existing interval if any
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Set up interval to check timer completion
      timerInterval = setInterval(() => {
        if (Date.now() >= timerState.endTime) {
          stopTimer();
          io.emit('timerComplete');
          sendDiscordNotification('✅ Timer completed!');
        }
      }, 100);

      console.log(`Timer started for ${duration} seconds`);
    }
  });

  // Handle timer stop
  socket.on('stopTimer', () => {
    if (timerState.isRunning) {
      stopTimer();
      io.emit('timerUpdate', getCurrentTimerState());
      sendDiscordNotification('⏸️ Timer stopped');
      console.log('Timer stopped');
    }
  });

  // Handle timer reset
  socket.on('resetTimer', () => {
    stopTimer();
    io.emit('timerUpdate', getCurrentTimerState());
    console.log('Timer reset');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

function stopTimer() {
  timerState.isRunning = false;
  timerState.endTime = null;
  timerState.duration = 0;
  timerState.startTime = null;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function getCurrentTimerState() {
  if (timerState.isRunning && timerState.endTime) {
    const remaining = Math.max(0, Math.ceil((timerState.endTime - Date.now()) / 1000));
    return {
      isRunning: true,
      remaining: remaining,
      duration: timerState.duration
    };
  }
  return {
    isRunning: false,
    remaining: 0,
    duration: 0
  };
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
