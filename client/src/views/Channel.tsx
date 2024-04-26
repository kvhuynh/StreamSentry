import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { readChat } from "../services/twitch.service.api";

export const Channel: React.FC = () => {
	// const [channelData, setChannelData] = useState();
	const { state } = useLocation();
	useEffect(() => {
		// if (state === undefined) {
		// 	// grab from twitch api
		// }
		readChat(state.channel.user_name);
	}, []);
	return (
		<Flex color="white" h={"100vh"}>
			<Box w="70%" bg="green.500">
				{/* graph here */}

			</Box>
			<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
				<iframe
					src={`https://www.twitch.tv/embed/${state.channel.user_name}/chat?parent=localhost`}
					width="100%"
					height="100%"
				></iframe>
			</Box>
		</Flex>
		// <Flex>
		// 	<iframe
		// 		src={`https://www.twitch.tv/embed/${state.channel.user_name}/chat?parent=localhost`}
		// 		width="100%"
		// 		height="100%"
		// 	></iframe>
		// </Flex>
	);
};
