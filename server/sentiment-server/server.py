import uvicorn
from fastapi import FastAPI
import socketio
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer



# Initialize FastAPI and Socket.IO
app = FastAPI()
sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
# sio = socketio.AsyncServer(cors_allowed_origins=["http://localhost:3000"], async_mode='asgi')

app.mount("/socket.io", socketio.ASGIApp(sio))

# Initialize sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

# @sio.event
# async def message(sid, data):
#     print(data);

@sio.event
async def message(sid, data):
    """Receives messages from the Twitch bot and processes sentiment."""
    username = data.get("username", "Unknown")
    message = data.get("message", "")
    print(data);

    sentiment_score = analyzer.polarity_scores(message)
    # sentiment = "positive" if sentiment_score["compound"] > 0.05 else "negative" if sentiment_score["compound"] < -0.05 else "neutral"

    response = {"username": username, "message": message, "sentiment": sentiment_score}
    print(f"Sentiment Analysis: {response}")

    # Send the sentiment result back
    await sio.emit("sentiment_result", response)

# # Run FastAPI server
# if __name__ == "__main__":
#     # import uvicorn
#     uvicorn.run("server:app", host="0.0.0.0", port=7000, reload=True)