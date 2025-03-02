import { io as socketClient } from "socket.io-client";
import config from "../config/config";

const fastApiSocket = socketClient(config.sentimentServerUrl, {
  transports: ["websocket", "polling"],
});

fastApiSocket.on("connect", () => console.log("✅ Connected to Sentiment API"));
fastApiSocket.on("disconnect", () => console.log("⚠️ Disconnected from Sentiment API"));

export default {
  sendMessage(username: string, message: string) {
    fastApiSocket.emit("message", { username, message });
  },
};
