import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { readChat } from "../services/twitch.service.api";
import socketIo from "socket.io-client";
import { socket } from "../socket"
interface Message {
	user: string;
	message: string;
}

export const Channel: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const { state } = useLocation();

	let ignore = false;

	// const socket = socketIo("http://localhost:8000", {
	// 	transports: ["websocket"],
	// });

	useEffect(() => {
		socket.connect();
		socket.on("connect", () => {
			console.log("Connected to Socket.io server");
			console.log(socket.id);
		});
	}, []);

	useEffect(() => {
		// Connect to Socket.io server
		// socket.connect();
		// socket.on("connect", () => {
		// 	console.log("Connected to Socket.io server");
		// 	console.log(socket.id);
		// });
		// console.log("wtf");

		//	// Listen for incoming messages
		const handleNewMessage = (msg: Message) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
			// console.log(msg);
		};
		socket.on("message", handleNewMessage);

		// Handle disconnection
		// socket.on("disconnect", () => {
		// 	console.log("Disconnected from Socket.io server");
		// });

		// // Clean up the socket connection when the component unmounts
		// return () => {
		// 	// socket.off("message", handleNewMessage);
		// 	socket.disconnect();
		// };
	}, []); // This useEffect runs only once when the component mounts

	useEffect(() => {
		if (!ignore) {
			readChat(state.channel.user_name);
		}
		return () => {
			ignore = true;
		};
	}, []);

	return (
		<Flex color="white" h={"100vh"}>
			<Box w="70%" bg="green.500">
				<div>
					<h1>Twitch Chat</h1>
					<ul>
						{messages.map((msg, index) => (
							<li key={index}>
								<strong>{msg.user}:</strong> {msg.message}
							</li>
						))}
					</ul>
				</div>
			</Box>
			<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
				<iframe
					src={`https://www.twitch.tv/embed/${state.channel.user_name}/chat?parent=localhost`}
					width="100%"
					height="100%"
				></iframe>
			</Box>
		</Flex>
	);
};
