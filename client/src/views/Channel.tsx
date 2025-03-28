// import { Box, Flex } from "@chakra-ui/react";
// import "chart.js/auto";
// import { socket } from "../socket";
// import { useLocation, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import {
// 	readChat,
// 	getEmotes,
// 	getChannelId,
// } from "../services/twitch.service.api";
// import SentimentChart from "../components/LineChart";
// import SearchBar from "../components/SearchBar";

// export const Channel: React.FC = () => {
// 	const { state } = useLocation();
// 	let { channelName } = useParams();
// 	const [channelId, setChannelId] = useState("");

// 	const isMounted = useRef(false);
// 	const leaveChannel = (channelName: string) => {
// 		if (channelName) {
// 			// socket.disconnect();
// 			console.log(`Leaving channel: ${channelName}`);
// 		}
// 	};
// 	useEffect(() => {
// 		// clicked from home page
// 		if (state) {
// 			channelName = state.channel.user_name;
// 			setChannelId(state.channel.id);
// 		} else {
// 			getChannelId(channelName!).then((res: string) => {
// 				setChannelId(res);
// 			});
// 		}
// 		console.log(channelName);

// 		readChat(channelName!, socket);

// 		// if (!isMounted.current) {
// 		// 	readChat(channelName!, socket);
// 		// 	// getEmotes(channelName!);
// 		// }
// 		// isMounted.current = true;
// 	}, [channelName]);

// 	return (
// 		<div>
// 			<Flex flexDirection={"column"} h={"100vh"}>
// 				<Box alignSelf={"center"} padding={5}>
// 					<SearchBar></SearchBar>
// 				</Box>
// 				<Box w="70%">
// 					showing channel {channelName}
// 					<SentimentChart socket={socket} channelName={channelName!} leaveChannel={leaveChannel}/>
// 				</Box>
// 				<Box w="70%">
// 					{/* <EmoteChart socket={socket} channelName={channelId!} /> */}
// 				</Box>
// 				<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
// 					<iframe
// 					src={`https://chatis.is2511.com/v2/?channel=${channelName}&animate=true&bots=true&size=1&font=3&shadow=3`}
// 					// width="100%"
// 					height="100%"
// 				></iframe>
// 				</Box>
// 			</Flex>
// 		</div>
// 	);
// };

// export default Channel;

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
			setChannelId(state.channel.id);
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

	}, [channelName]);

	return (
		<div>
			<Flex flexDirection={"column"} h={"100vh"}>
				<Box alignSelf={"center"} padding={5}>
					<SearchBar></SearchBar>
				</Box>
				<Box w="70%">
					showing channel {channelName}
					{/* <SentimentChart socket={socket} channelName={channelName!} key={channelName!}/> */}
				</Box>
				<Box w="70%">
					{/* <EmoteChart socket={socket} channelName={channelId!} /> */}
					<SentimentChart socket={socket} channelName={channelName!} key={channelName!}/>
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
