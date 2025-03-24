import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
} from "chart.js";
import { Socket } from "socket.io-client";
import { readChat } from "../services/twitch.service.api";

ChartJS.register(
	LineElement,
	PointElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale
);

type DataSet = {
	label: string;
	data: Array<object>[];
	borderColor: string;
	backgroundColor: string;
};

type SentimentChartProps = {
	socket: Socket; // Accept socket instance from Channel.tsx
	leaveChannel: any;
	channelName: string;
};

export const SentimentChart: React.FC<SentimentChartProps> = ({
	socket,
	channelName,

}) => {
	// 	const { state } = useLocation();
	// 	let { channelName } = useParams();
	const [chartData, setChartData] = useState<{
		labels: string[];
		datasets: Array<DataSet>;
	}>({
		labels: [],
		datasets: [
			{
				label: "Negative",
				data: [],
				borderColor: "rgb(255, 99, 132)", // Red
				backgroundColor: "rgba(255, 99, 132, 0.2)",
			},
			{
				label: "Neutral",
				data: [],
				borderColor: "rgb(128, 128, 128)", // Gray
				backgroundColor: "rgba(128, 128, 128, 0.2)",
			},
			{
				label: "Positive",
				data: [],
				borderColor: "rgb(75, 192, 192)", // Green
				backgroundColor: "rgba(75, 192, 192, 0.2)",
			},
			{
				label: "Compound",
				data: [],
				borderColor: "rgb(54, 162, 235)", // Blue
				backgroundColor: "rgba(54, 162, 235, 0.2)",
			},
		],
	});

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

	// const isMounted = useRef(false);
	// useEffect(() => {
	// 	if (!isMounted.current) {
	// 		readChat(channelName);
	// 	}
	// 	isMounted.current = true;
	// }, [channelName]);

	useEffect(() => {
		console.log("use effect trigger");
		const handleSentimentData = (newData) => {
			// console.log("Received sentiment data:", newData);

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
					datasets: prev.datasets.map((dataset, index) => ({
						...dataset,
						data: [...dataset.data, sentimentValues[index]].slice(-30),
					})),
				};
			});
		};

		socket.on("sentiment_data", handleSentimentData);

		return () => {
			socket.off("sentiment_data", handleSentimentData);
            console.log("sentiment_data disconnected");
			// leaveChannel(channelName)
            
		};
	}, []); // Add socket as a dependency

	return (
		<div>
			<h2>Sentiment Over Time</h2>
			<Line data={chartData} options={options} />
		</div>
	);
};

export default SentimentChart;
