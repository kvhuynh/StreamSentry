// import { Server, Socket } from "socket.io";
// // import sentimentService from "../services/sentiment.service";

// export default function socketHandler(io: Server) {
//   console.log("test");
  
//   io.on("connection", (socket: Socket) => {
//     console.log("✅ Frontend connected:", socket.id);

//     // socket.on("message", async (data: { username: string; message: string }) => {
//     //   console.log("Received from frontend:", data);
//     //   sentimentService.sendMessage(data.username, data.message);
//     // });

//     io.emit("words", () => {
//       console.log("fasdfasdfasdf");
      
//     })

//     socket.on("disconnect", () => console.log("⚠️ Frontend disconnected:", socket.id));

    
//   });
// }

import { Server, Socket } from "socket.io";

let ioInstance: Server | null = null;

export const initializeSocket = (io: Server) => {
  ioInstance = io;
  console.log("✅ Socket initialized");

  io.on("connection", (socket: Socket) => {
    console.log("✅ Frontend connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("⚠️ Frontend disconnected:", socket.id);
    });
  });
}

// Function to emit events from anywhere
export const emitEvent = (eventName: string, data: any)  => {
  if (ioInstance) {
    ioInstance.emit(eventName, data);
  } else {
    console.error("❌ Socket.IO not initialized");
  }
}

export default {initializeSocket, emitEvent}
