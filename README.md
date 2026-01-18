# Shared Live Timer

A simple real-time timer website where anyone can set a timer that all visitors can see simultaneously. Only one timer can run at a time, and all changes are synchronized across all connected clients in real-time.

## Features

- **Real-time synchronization** - All visitors see the same timer updates instantly using WebSockets
- **Single shared timer** - Only one timer can run at a time, shared across all visitors
- **Quick presets** - One-click timer presets for 5, 10, 20, and 30 minutes
- **Start/Stop/Reset controls** - Anyone can control the timer
- **Browser push notifications** - Get notified in your browser when the timer starts, stops, or completes
- **Discord notifications** - Receive timer updates in your Discord server via webhooks
- **Responsive design** - Works on desktop and mobile devices
- **Visual feedback** - Clear status indicators and animations

## Technology Stack

- **Backend**: Node.js, Express, Socket.io, Discord Webhooks
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

3. **(Optional)** Set up Discord notifications:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Create a Discord webhook:
     - Open Discord and go to the channel where you want timer notifications
     - Click the gear icon (⚙️) next to the channel name
     - Go to **Integrations** → **Webhooks**
     - Click **New Webhook**
     - Name it (e.g., "Timer Bot") and optionally customize the avatar
     - Click **Copy Webhook URL**
   - Edit `.env` and add your webhook URL:
     ```
     DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url_here
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

### Discord Notifications

1. Have a server admin follow the setup instructions above to configure the Discord webhook
2. Once configured, timer events will automatically be posted to your Discord channel
3. All members of the channel can see timer updates
4. No individual subscription needed - it's server-wide!

## How It Works

### Timer Synchronization
- The server maintains a single timer state
- When a client starts/stops/resets the timer, the action is broadcast to all connected clients
- Socket.io ensures all clients receive updates in real-time
- The timer countdown is displayed locally on each client for smooth performance
- Server periodically checks for timer completion and notifies all clients

### Notifications
- **Browser Notifications**: Uses the Web Notifications API to send native browser notifications
- **Discord Webhooks**:
  - Server sends HTTP POST requests to a Discord webhook URL when timer events occur
  - Messages appear in the configured Discord channel instantly
  - No bot hosting or complex setup required - just a webhook URL
  - Discord notifications work even when the website is closed
  - All channel members see the updates automatically

## Project Structure

```
.
├── server.js           # Express server, Socket.io, and Discord webhooks
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
