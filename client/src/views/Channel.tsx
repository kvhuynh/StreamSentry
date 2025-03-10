import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { readChat } from "../services/twitch.service.api";
import { Bar, Line } from "react-chartjs-2";
import { socket } from "../socket";
import "chart.js/auto";
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
	const { state } = useLocation();
	let ignore = false;

	const [chartData, setChartData] = useState<{
		labels: string[];
		datasets: any[];
	}>({
		labels: [],
		datasets: [
			{
				label: "Negative",
				data: [],
				borderColor: "rgb(255, 99, 132)", // Red
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				tension: 0.4,
			},
			{
				label: "Neutral",
				data: [],
				borderColor: "rgb(128, 128, 128)", // Gray
				backgroundColor: "rgba(128, 128, 128, 0.2)",
				tension: 0.4,
			},
			{
				label: "Positive",
				data: [],
				borderColor: "rgb(75, 192, 192)", // Green
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				tension: 0.4,
			},
			{
				label: "Compound",
				data: [],
				borderColor: "rgb(54, 162, 235)", // Blue
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				tension: 0.4,
			},
		],
	});

	useEffect(() => {
		socket.on("sentiment_data", (newData) => {
			console.log(newData);

			setChartData((prev) => {
				const newLabels = [
					...prev.labels,
					new Date().toLocaleTimeString(),
				].slice(-30);

				const sentimentValues = [
					newData.sentiment.neg,
					newData.sentiment.neu,
					newData.sentiment.pos,
					newData.sentiment.compound,
				];

				return {
					labels: newLabels,
					datasets: prev.datasets.map((dataset, index) => {
						const newDataset = [...dataset.data, sentimentValues[index]].slice(
							-30
						);
						return { ...dataset, data: newDataset };
					}),
				};
			});
		});

		return () => {
			socket.off("sentiment_data");
		};
	}, []);

	const options = {
		animation: {
			duration: 0,
		},
		responsive: true,
		scales: {
			y: {
				min: -1.5,
				max: 1.5,
				title: { display: true, text: "Sentiment Score" },
			},
			x: { title: { display: true, text: "Time" } },
		},
	};

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
			<h2>Real-Time Sentiment Analysis</h2>
			<Box w="70%">
				<Line data={chartData} options={options} />
			</Box>
			<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
				<iframe
					src={`https://chatis.is2511.com/v2/?channel=${state.channel.user_name}&animate=true&bots=true&size=1&font=3&shadow=3`}
					width="100%"
					height="100%"
				></iframe>
			</Box>
		</Flex>
	);
};
