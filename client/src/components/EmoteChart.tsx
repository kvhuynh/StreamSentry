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
	socket: Socket; // Accept socket instance from Channel.tsx
	channelName: string;
};

export const EmoteChart: React.FC<EmoteChartProps> = ({
	socket,
	channelName,
}) => {
	const { state } = useLocation();
	let { channelNames } = useParams();

	useEffect(() => {
		const handleSentimentData = (newData) => {
			socket.on("sentiment_data", handleSentimentData);

			return () => {
				socket.off("sentiment_data", handleSentimentData);
			};
		};
	}, []);
};

export default EmoteChart;
