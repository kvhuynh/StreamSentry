// // const socketIo = require("socket.io");
// // let io: any;

// // module.exports = {
// //   init: function(server: any) {
// //     if (!io) {
// //       io = socketIo(server);
// //       console.log("Socket.io initialized");

// //       io.on("connection", (socket: any) => {
// //         console.log("Client connected");
// //         console.log(socket.id);

// //         // Handle disconnect
// //         socket.on("disconnect", () => {
// //           console.log("Client disconnected");
// //         });
// //       });
// //     }
// //     return io;
// //   },
// //   getio: function() {
// //     if (!io) {
// //       throw new Error("must call .init(server) before you can call .getio()");
// //     }
// //     return io;
// //   },
// // };

// import { Server } from "socket.io";
// import { io as clientIo } from "socket.io-client";

// let io: Server;

// module.exports = {
//   init: function (server: any) {
//     if (!io) {
//       io = new Server(server, {
//         cors: { origin: "*" },
//       });

//       console.log("Socket.io initialized");

//       io.on("connection", (socket) => {
//         console.log(socket.id);
        
//         console.log("Client connected:", socket.id);

//         // Forward messages to FastAPI
//         socket.on("message", (data) => {
//           console.log("Forwarding message to FastAPI:", data);
//           fastApiSocket.emit("message", data);
//         });

//         socket.on("disconnect", () => {
//           console.log("Client disconnected");
//         });
//       });

//       // Connect to FastAPI Socket.IO server
//       const fastApiSocket = clientIo("http://localhost:7000");

//       fastApiSocket.on("connect", () => {
//         console.log("Connected to FastAPI Socket.IO server");
//       });

//       fastApiSocket.on("response", (data) => {
//         console.log("FastAPI Response:", data);
//       });
//     }
//     return io;
//   },

//   getio: function () {
//     if (!io) {
//       throw new Error("Must call .init(server) before using .getio()");
//     }
//     return io;
//   },
// };
