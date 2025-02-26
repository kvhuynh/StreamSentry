import { Server, Socket } from "socket.io";
import sentimentClient from "./sentimentClient";

export default function socketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Frontend connected:", socket.id);

    socket.on("message", async (data: { username: string; message: string }) => {
      console.log("Received from frontend:", data);

      try {
        const sentimentResult = await sentimentClient.analyze(data);
        io.emit("sentiment_result", sentimentResult);
      } catch (error) {
        console.error("Error contacting sentiment server:", (error as Error).message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Frontend disconnected:", socket.id);
    });
  });
}
