import { Box, Flex } from "@chakra-ui/react";
import "chart.js/auto";
import { socket } from "../socket";
import SentimentChart from "../components/LineChart";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
	readChat,
	getEmotes,
	getChannelId,
} from "../services/twitch.service.api";

export const Channel: React.FC = () => {
	const { state } = useLocation();
	let { channelName } = useParams();
	const [channelId, setChannelId] = useState("");

	const isMounted = useRef(false);

	useEffect(() => {
		// clicked from home page
		if (state) {
			console.log("asdfasdfasdfsdf");
			channelName = state.channel.user_name;
			setChannelId(state.channel.id);
		} else {
			getChannelId(channelName!).then((res: string) => {
				setChannelId(res);
			});
		}

		if (!isMounted.current) {
			readChat(channelName!);
			// getEmotes(channelName!);
		}
		isMounted.current = true;
	}, []);
	return (
		<Flex flexDirection={"column"} color="white" h={"100vh"}>
			<Box w="70%">
				<SentimentChart socket={socket} channelName={channelName!} />
			</Box>
			<Box w="70%">
				{/* <EmoteChart socket={socket} channelName={channelId!} /> */}
			</Box>
			<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
				{/* <iframe
					src={`https://chatis.is2511.com/v2/?channel=${channelName}&animate=true&bots=true&size=1&font=3&shadow=3`}
					// width="100%"
					height="100%"
				></iframe> */}
			</Box>
		</Flex>
	);
};

export default Channel;
