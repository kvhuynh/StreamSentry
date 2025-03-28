import { Box, Flex } from "@chakra-ui/react";
import "chart.js/auto";
import { socket } from "../socket";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
	readChat,
	getEmotes,
	getChannelId,
} from "../services/twitch.service.api";
import SentimentChart from "../components/LineChart";
import EmoteChart from "../components/EmoteChart"
import SearchBar from "../components/SearchBar";

export const Channel: React.FC = () => {
	const { state } = useLocation();
	let { channelName } = useParams();
	const [channelId, setChannelId] = useState("");

	const isClientInitialized = useRef(false);
	const previousChannel = useRef<unknown | null >(null);

	useEffect(() => {
		// clicked from home page
		if (state) {
			channelName = state.channel.user_name;
			console.log(state.channel);
			
			console.log(state.channel.id)
			setChannelId(state.channel.user_id);
		} else {
			getChannelId(channelName!).then((res: string) => {
				setChannelId(res);
			});
		}

		// Check if the channel has changed
		if (previousChannel.current !== channelName) {
			if (isClientInitialized.current) {
				// Leave the previous channel before joining the new one
				socket.emit("leave_channel", previousChannel.current);
				console.log(`Leaving channel: ${previousChannel.current}`);
			}

			readChat(channelName!, socket);
			isClientInitialized.current = true;
			previousChannel.current = channelName;
		}

	}, [channelName, channelId]);

	return (
		<div>
			<Flex flexDirection={"column"} h={"100vh"}>
				<Box alignSelf={"center"} padding={5}>
					<SearchBar></SearchBar>
				</Box>
				<Box w="70%">
					showing channel {channelName}
					<SentimentChart socket={socket} channelName={channelName!} key={channelName!}/>
				</Box>
				<Box w="70%">
					{channelId ? (<EmoteChart socket={socket} channelId={channelId}></EmoteChart>): "yo"}
					<EmoteChart socket={socket} channelId={channelId} />
					{/* <SentimentChart socket={socket} channelName={channelName!} key={channelName!}/> */}
				</Box>
				<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
					<iframe
						src={`https://chatis.is2511.com/v2/?channel=${channelName}&animate=true&bots=true&size=1&font=3&shadow=3`}
						// width="100%"
						height="100%"
					></iframe>
				</Box>
			</Flex>
		</div>
	);
};

export default Channel;
