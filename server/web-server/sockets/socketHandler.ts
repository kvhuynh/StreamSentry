import { Server, Socket } from "socket.io";
import sentimentService from "../services/sentiment.service";

export default function socketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("✅ Frontend connected:", socket.id);

    socket.on("message", async (data: { username: string; message: string }) => {
      console.log("Received from frontend:", data);
      sentimentService.sendMessage(data.username, data.message);
    });

    socket.on("disconnect", () => console.log("⚠️ Frontend disconnected:", socket.id));
  });
}
