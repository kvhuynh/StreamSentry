// import { Box, Flex } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { readChat } from "../services/twitch.service.api";

// export const Channel: React.FC = () => {
// 	// const [channelData, setChannelData] = useState();
// 	const { state } = useLocation();
// 	useEffect(() => {
// 		// if (state === undefined) {
// 		// 	// grab from twitch api
// 		// }
// 		readChat(state.channel.user_name);
// 	}, []);
// 	return (
// 		<Flex color="white" h={"100vh"}>
// 			<Box w="70%" bg="green.500">
// 				{/* graph here */}

// 			</Box>
// 			<Box flex="1" position={"fixed"} ml="70%" h={"100vh"} w={"30%"}>
// 				<iframe
// 					src={`https://www.twitch.tv/embed/${state.channel.user_name}/chat?parent=localhost`}
// 					width="100%"
// 					height="100%"
// 				></iframe>
// 			</Box>
// 		</Flex>
// 		// <Flex>
// 		// 	<iframe
// 		// 		src={`https://www.twitch.tv/embed/${state.channel.user_name}/chat?parent=localhost`}
// 		// 		width="100%"
// 		// 		height="100%"
// 		// 	></iframe>
// 		// </Flex>
// 	);
// };
// TwitchChat.js
// TwitchChat.tsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Message {
  user: string;
  message: string;
}

export const Channel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Twitch Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channel;

