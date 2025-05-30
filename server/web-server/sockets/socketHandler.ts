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
};

export const emitEvent = (eventName: string, data: any) => {
	if (ioInstance) {
		// console.log(data);
		
		ioInstance.emit(eventName, data);
	} else {
		console.error("❌ Socket.IO not initialized");
	}
};

// export const disconnect = ()

export default { initializeSocket, emitEvent };
