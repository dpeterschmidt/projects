# Shared Live Timer

A simple real-time timer website where anyone can set a timer that all visitors can see simultaneously. Only one timer can run at a time, and all changes are synchronized across all connected clients in real-time.

## Features

- **Real-time synchronization** - All visitors see the same timer updates instantly using WebSockets
- **Single shared timer** - Only one timer can run at a time, shared across all visitors
- **Start/Stop/Reset controls** - Anyone can control the timer
- **Responsive design** - Works on desktop and mobile devices
- **Visual feedback** - Clear status indicators and animations

## Technology Stack

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: HTML5, CSS3, JavaScript
- **Real-time Communication**: WebSocket (Socket.io)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd projects
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. Enter a duration in seconds (e.g., 60 for 1 minute)
2. Click "Start Timer" to begin the countdown
3. All visitors will see the timer counting down in real-time
4. Use "Stop Timer" to pause or "Reset" to clear the timer
5. When the timer completes, all visitors will see a notification

## How It Works

- The server maintains a single timer state
- When a client starts/stops/resets the timer, the action is broadcast to all connected clients
- Socket.io ensures all clients receive updates in real-time
- The timer countdown is displayed locally on each client for smooth performance
- Server periodically checks for timer completion and notifies all clients

## Project Structure

```
.
├── server.js           # Express server and Socket.io logic
├── package.json        # Dependencies and scripts
├── public/
│   ├── index.html     # Main HTML page
│   ├── style.css      # Styling
│   └── script.js      # Client-side JavaScript and Socket.io
└── README.md          # This file
```

## License

ISC
