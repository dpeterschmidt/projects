require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Initialize Telegram Bot if token is provided
let telegramBot = null;
const telegramSubscribers = new Set(); // Store chat IDs of subscribed users

if (process.env.TELEGRAM_BOT_TOKEN) {
  telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

  // Handle /start command
  telegramBot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    telegramSubscribers.add(chatId);
    telegramBot.sendMessage(chatId,
      '🎉 Welcome to Shared Live Timer!\n\n' +
      'You are now subscribed to timer notifications. You will receive updates when:\n' +
      '• Timer starts\n' +
      '• Timer stops\n' +
      '• Timer completes\n\n' +
      `Your Chat ID: ${chatId}\n\n` +
      'Send /stop to unsubscribe.'
    );
    console.log(`Telegram user ${chatId} subscribed`);
  });

  // Handle /stop command
  telegramBot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;
    telegramSubscribers.delete(chatId);
    telegramBot.sendMessage(chatId, '👋 You have been unsubscribed from timer notifications.');
    console.log(`Telegram user ${chatId} unsubscribed`);
  });

  console.log('Telegram bot initialized successfully');
} else {
  console.log('Telegram bot token not provided. Telegram notifications disabled.');
}

// Timer state
let timerState = {
  isRunning: false,
  endTime: null,
  duration: 0,
  startTime: null
};

let timerInterval = null;

// Send Telegram notifications to all subscribers
function sendTelegramNotification(message) {
  if (telegramBot && telegramSubscribers.size > 0) {
    telegramSubscribers.forEach(chatId => {
      telegramBot.sendMessage(chatId, message).catch(err => {
        console.error(`Failed to send message to ${chatId}:`, err.message);
        // Remove invalid chat IDs
        if (err.response && err.response.statusCode === 403) {
          telegramSubscribers.delete(chatId);
        }
      });
    });
  }
}

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get bot info
app.get('/api/bot-info', (req, res) => {
  if (telegramBot) {
    telegramBot.getMe().then(botInfo => {
      res.json({
        available: true,
        username: botInfo.username,
        name: botInfo.first_name
      });
    }).catch(err => {
      console.error('Error getting bot info:', err);
      res.json({ available: false });
    });
  } else {
    res.json({ available: false });
  }
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

      // Send Telegram notification
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      let timeStr = '';
      if (minutes > 0) {
        timeStr = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        if (seconds > 0) timeStr += ` ${seconds} second${seconds !== 1 ? 's' : ''}`;
      } else {
        timeStr = `${seconds} second${seconds !== 1 ? 's' : ''}`;
      }
      sendTelegramNotification(`⏱️ Timer started for ${timeStr}`);

      // Clear existing interval if any
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Set up interval to check timer completion
      timerInterval = setInterval(() => {
        if (Date.now() >= timerState.endTime) {
          stopTimer();
          io.emit('timerComplete');
          sendTelegramNotification('✅ Timer completed!');
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
      sendTelegramNotification('⏸️ Timer stopped');
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
