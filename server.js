const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Timer state
let timerState = {
  isRunning: false,
  endTime: null,
  duration: 0,
  startTime: null
};

let timerInterval = null;

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

      // Clear existing interval if any
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // Set up interval to check timer completion
      timerInterval = setInterval(() => {
        if (Date.now() >= timerState.endTime) {
          stopTimer();
          io.emit('timerComplete');
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
