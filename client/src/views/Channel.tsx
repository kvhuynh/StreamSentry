import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { readChat } from "../services/twitch.service.api";
import { Bar } from "react-chartjs-2";
import { socket } from "../socket";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	// Legend,
} from "chart.js";
import faker from "faker";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip
	// Legend
);

interface Message {
	user: string;
	message: string;
}

export const Channel: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [user, setUser] = useState<any>([]);
	const { state } = useLocation();

	let ignore = false;

	const labels = user;

	const data = {
		labels,
		datasets: [
			{
				labels: "dataset 1",
				data: labels.map((label) => label.length),
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
			},
		],
	};

	useEffect(() => {
		socket.connect();
		socket.on("connect", () => {
			console.log("Connected to Socket.io server");
			console.log(socket.id);
		});
	}, []);

	useEffect(() => {
		const handleNewMessage = (msg: Message) => {
			setMessages((prevMessages) => [...prevMessages, msg]);
			setUser((prevUser) => [...prevUser, msg.user]);
		};
		socket.on("message", handleNewMessage);
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
					<Bar data={data}></Bar>
					{/* <ul>
						{messages.map((msg, index) => (
							<li key={index}>
								<strong>{msg.user}:</strong> {msg.message}
							</li>
						))}
					</ul> */}
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
