

require("dotenv").config();
const cors = require("cors");
const express = require("express");
import { createServer } from "http";
import { Server } from "socket.io";
const { twitchRouter } = require("./routes/twitch.routes");
// const { initializeSocket } require("./services/twitch.service.ts")
// const { initializeSocket } require("./services/twitch.service.ts")
const { initializeSocket }  = require("./services/twitch.service")


const app = express();
const port = 8000;

const httpServer = createServer(app);

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use("/api/v1/twitch/", twitchRouter);
initializeSocket(httpServer);
httpServer.listen(port, () => {
	console.log(`Listening on port ${port} for requests to respond to`);
});