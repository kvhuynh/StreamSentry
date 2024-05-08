// let io: any;
// const socket = require("socket.io");
// module.exports = {
// 	init: function (server: any) {
// 		io = socket(server);
// 		io.on("connection", (socket: any) => {
// 			console.log("Client connected");
// 			console.log(socket.id);
// 		});
// 		return io;
// 	},
// 	getio: function () {
// 		// return previously cached value
// 		if (!io) {
// 			throw new Error("must call .init(server) before you can call .getio()");
// 		}
// 		return io;
// 	},
// };

const socketIo = require("socket.io");
let io: any;

module.exports = {
  init: function(server: any) {
    if (!io) {
      io = socketIo(server);
      console.log("Socket.io initialized");

      io.on("connection", (socket: any) => {
        console.log("Client connected");
        console.log(socket.id);

        // Handle disconnect
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
    }
    return io;
  },
  getio: function() {
    if (!io) {
      throw new Error("must call .init(server) before you can call .getio()");
    }
    return io;
  },
};
