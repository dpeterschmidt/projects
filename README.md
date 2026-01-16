# Shared Live Timer

A simple real-time timer website where anyone can set a timer that all visitors can see simultaneously. Only one timer can run at a time, and all changes are synchronized across all connected clients in real-time.

## Features

- **Real-time synchronization** - All visitors see the same timer updates instantly using WebSockets
- **Single shared timer** - Only one timer can run at a time, shared across all visitors
- **Quick presets** - One-click timer presets for 5, 10, 20, and 30 minutes
- **Start/Stop/Reset controls** - Anyone can control the timer
- **Browser push notifications** - Get notified in your browser when the timer starts, stops, or completes
- **Telegram notifications** - Receive timer updates on Telegram, even when you're not on the page
- **Responsive design** - Works on desktop and mobile devices
- **Visual feedback** - Clear status indicators and animations

## Technology Stack

- **Backend**: Node.js, Express, Socket.io, Telegram Bot API
- **Frontend**: HTML5, CSS3, JavaScript, Browser Notifications API
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

3. **(Optional)** Set up Telegram notifications:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Create a Telegram bot:
     - Open Telegram and search for `@BotFather`
     - Send the command `/newbot`
     - Follow the instructions to name your bot
     - Copy the bot token provided by BotFather
   - Edit `.env` and add your bot token:
     ```
     TELEGRAM_BOT_TOKEN=your_bot_token_here
     ```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Basic Timer Controls

1. Enter a duration in seconds or use quick presets (5, 10, 20, or 30 minutes)
2. Click "Start Timer" to begin the countdown
3. All visitors will see the timer counting down in real-time
4. Use "Stop Timer" to pause or "Reset" to clear the timer
5. When the timer completes, all visitors will see a notification

### Browser Notifications

1. Click "Enable Browser Notifications" in the notifications section
2. Grant permission when your browser prompts you
3. You'll receive notifications when the timer starts, stops, or completes
4. Notifications work even when the tab is in the background

### Telegram Notifications

1. Find the bot username displayed on the page (e.g., `@YourTimerBot`)
2. Open Telegram and search for that bot
3. Send `/start` to the bot to subscribe
4. You'll receive messages on Telegram for all timer events
5. Send `/stop` to the bot to unsubscribe

## How It Works

### Timer Synchronization
- The server maintains a single timer state
- When a client starts/stops/resets the timer, the action is broadcast to all connected clients
- Socket.io ensures all clients receive updates in real-time
- The timer countdown is displayed locally on each client for smooth performance
- Server periodically checks for timer completion and notifies all clients

### Notifications
- **Browser Notifications**: Uses the Web Notifications API to send native browser notifications
- **Telegram Bot**:
  - Server runs a Telegram bot that listens for `/start` and `/stop` commands
  - Subscribed users are stored in memory (reset on server restart)
  - When timer events occur, the server sends messages to all subscribed Telegram users
  - Telegram notifications work even when the website is closed

## Project Structure

```
.
├── server.js           # Express server, Socket.io, and Telegram bot
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .env               # Environment variables (not in git)
├── public/
│   ├── index.html     # Main HTML page
│   ├── style.css      # Styling
│   └── script.js      # Client-side JavaScript, Socket.io, and notifications
└── README.md          # This file
```

## License

ISC
