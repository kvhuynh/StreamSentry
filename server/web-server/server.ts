require("dotenv").config();
const cors = require("cors");
const express = require("express");
import { createServer } from "http";
const { twitchRouter } = require("./routes/twitch.routes");

const app = express();
const port = 3000;

const httpServer = createServer(app);

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));


app.use("/api/v1/twitch/", twitchRouter);
const io = require("./config/socket.config").init(httpServer);
httpServer.listen(port, () => {
	console.log(`Listening on port ${port} for requests to respond to`);
});


const socketIoClient = require("socket.io-client");

const fastApiSocket = socketIoClient("http://localhost:8000", {
	transports: ["websocket", "polling"],  // Specify transport methods explicitly
  });

fastApiSocket.on("connect", () => {
  console.log("Connected to FastAPI server");
  fastApiSocket.emit("message", {message:"hello"})
});

fastApiSocket.on("disconnect", () => {
  console.log("Disconnected from FastAPI server");
});

fastApiSocket.on("response", (data: any) => {
  console.log("Received response from FastAPI:", data);
});

// You can emit data here as well
fastApiSocket.emit("message", { username: "someUser", message: "Hello FastAPI" });
