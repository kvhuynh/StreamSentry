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
	const [user, setUser] = useState<string[]>([]);
	const [words, setWords] = useState<object>({});
	// const [words, setWords] = useState<any>([]);
	const { state } = useLocation();

	let ignore = false;

	const data = {
		datasets: [
			{
				labels: "dataset 1",
				// data: labels.map((key: any) => [key, words[key]]),
				data: words,

				backgroundColor: "rgb(255, 99, 132)",
				stack: "Stack 0",
			},
		],
	};

	useEffect(() => {
		const handleNewMessage = (words: object) => {
			console.log("test");
			
			setWords(words);
			// setWords((prevWords) => ({ ...prevWords, ...words }))
		};

		// socket.on("words", handleNewMessage);
		socket.on("test", (payload) => {
			console.log(payload);
			
		})
		return () => {
			socket.off("words", handleNewMessage);
		};
	}, []);

	useEffect(() => {
		console.log(state.channel);

		if (!ignore) {
			readChat(state.channel.user_name, state.channel.user_id);
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
