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
import { useLocation, useParams } from "react-router-dom";

type EmoteChartProps = {
	socket: Socket;
	channelId: string;
};

export const EmoteChart: React.FC<EmoteChartProps> = ({
	socket,
	channelId,
}) => {
	const { state } = useLocation();
	let { channelName } = useParams();

	useEffect(() => {
		if (!channelName) {
			// take channelName
		}
		// const handleSentimentData = (newData) => {
		// 	socket.on("sentiment_data", handleSentimentData);

		// 	return () => {
		// 		socket.off("sentiment_data", handleSentimentData);
		// 	};
		// };
	}, []);
};

export default EmoteChart;
