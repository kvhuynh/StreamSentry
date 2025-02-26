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



