# Stream Sentry 🚀🎥

**Real-time Twitch Chat Analysis with Sentiment & Trend Detection**

&#x20;*(Replace with actual banner image)*

## 📌 Overview

**Stream Sentry** is a real-time **Twitch chat analysis tool** that leverages **sentiment analysis, keyword tracking, and emote recognition** to provide streamers and moderators with deep insights into chat dynamics.

With **seamless integration** between a **TypeScript-based webserver**, a **FastAPI-powered sentiment engine**, and an interactive **frontend**, Stream Sentry ensures **live monitoring** of audience reactions and chat trends.

## ✨ Features

- **Live Sentiment Analysis** – Detect positive, neutral, and negative messages in real time.
- **Keyword & Trend Tracking** – Identify trending words and common phrases in chat.
- **Emote Recognition** – Analyze usage of Twitch, 7TV, and BTTV emotes.
- **Real-time Insights** – Websocket-powered live updates for immediate feedback.
- **Scalable Microservices Architecture** – Separate services for chat processing, sentiment analysis, and the frontend.
- **Dockerized Deployment** – Ensures consistency across different environments.

## 🛠️ Tech Stack

| Component            | Technology Stack               |
| -------------------- | ------------------------------ |
| **Frontend**         | React + TypeScript + Vite      |
| **Webserver**        | Node.js + Express + Socket.IO  |
| **Sentiment Engine** | FastAPI + Vader + WebSockets   |
| **Database**         | (Planned) PostgreSQL / MongoDB |
| **Infrastructure**   | Docker + Docker Compose        |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/stream-sentry.git
cd stream-sentry
```

### 2️⃣ Set Up Environment Variables

Copy the example `.env` file and fill in the necessary credentials:

```sh
cp .env.example .env
```

#### Environment Variables Needed

```
TWITCH_AUTHORIZATION_TOKEN=your_twitch_auth_token
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
FRONTEND_URL=http://localhost:5173
SENTIMENT_SERVER_URL=http://localhost:8000
```

### 3️⃣ Run the Application Using Docker

Ensure **Docker & Docker Compose** are installed, then build and run all services:

```sh
docker-compose up --build -d
```

This will:\
✅ Start the **webserver** (Node.js + Express) on `http://localhost:3000`\
✅ Start the **frontend** (React + Vite) on `http://localhost:5173`\
✅ Start the **sentiment server** (FastAPI) on `http://localhost:8000`

### 4️⃣ Access the Web Dashboard

Open your browser and go to:\
🔗 \`\`

---

## 📡 How It Works

1. **Twitch Chat Connection**
   - The **webserver** listens to Twitch chat messages using `tmi.js`.
2. **Message Processing & Sentiment Analysis**
   - The **sentiment server** evaluates each message's emotional tone in real time.
3. **Live Updates via WebSockets**
   - Results are pushed to the **frontend** using **Socket.IO** for an interactive dashboard.

---

## 🛠 Updating Dependencies & Containers

To ensure consistency across machines, run the **update script** before switching devices:

```sh
./update-containers.sh
```

This will:\
✅ Pull the latest code\
✅ Install new dependencies\
✅ Rebuild & restart Docker containers

---

## 🎯 Future Roadmap

- **AI-powered sarcasm detection**
- **Deeper Twitch API integration (moderation alerts, viewer stats)**
- **Customizable chat filters & visualization tools**
- **Mobile-friendly UI**

---

## 📝 License

MIT License – Free to use and contribute!

---

## 🤝 Contributing

Want to help improve Stream Sentry? Fork the repo, make your changes, and submit a pull request!

---

## 🚀 Let's Connect!

🔗 **GitHub:** [yourusername/stream-sentry](https://github.com/yourusername/stream-sentry)\
📧 **Contact:** [your@email.com](mailto\:your@email.com)





<!-- pipenv shell
uvicorn server:app --reload -->


