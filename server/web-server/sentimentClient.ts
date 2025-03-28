import config from "./config/config";
import { io as socketIoClient } from "socket.io-client";
import { emitEvent } from "./sockets/socketHandler";

const fastApiSocket = socketIoClient(config.sentimentServerUrl, {
    transports: ["websocket", "polling"]
});

fastApiSocket.on("connect", () => {
    console.log("✅ Sentiment Server connected");
    fastApiSocket.emit("message", { message: "hello" });
});

fastApiSocket.on("disconnect", () => {
    console.log("⚠️ Sentiment Server disconnected");
});

fastApiSocket.on("sentiment_result", (data: any) => {
    // sends data to front end
    emitEvent("sentiment_data", data);
});



export default fastApiSocket;
