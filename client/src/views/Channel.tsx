import { Box, Center, Flex, Square, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Channel: React.FC = (props: any) => {
	// const [channelData, setChannelData] = useState();
	let { state } = useLocation();
	useEffect(() => {
		console.log(state.channel.user_name);
	}, []);
	return (
		// <Flex color="white">
		// 	<Center w="100px" bg="green.500">
		// 		<Text>Box 1</Text>
		// 	</Center>
		// 	<Square bg="blue.500" size="150px">
		// 		<Text>Box 2</Text>
		// 	</Square>
		// 	<Box flex="1" bg="tomato">

		// 	</Box>
		// </Flex>
		<Flex>
			<iframe
				src={`https://www.twitch.tv/embed/${state.channel.user_name}/chat?parent=localhost`}
				width="100%"
				height="100%"
			></iframe>
		</Flex>
	);
};
