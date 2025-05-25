// hooks/useChatListener.ts
import { useEffect, useRef, useState } from "react";
import {
	readChat,
	getEmotes,
	getChannelId,
} from "../services/twitch.service.api";
import { socket } from "../socket"; // adjust path if needed

export const useChatListener = (channelName: string) => {
	const previousChannel = useRef<string | null>(null);
	const isClientInitialized = useRef(false);
	const [channelId, setChannelId] = useState<string>("");

	useEffect(() => {
		if (!channelName) return;

		const handleEmoteMetaData = (data: any) => {
			console.log("Received emoteMetaData:", data);
		};

		// Clean up stale listeners before adding new one
		// socket.off("emoteMetaData");
		// socket.on("emoteMetaData", handleEmoteMetaData);
        socket.off("popularEmotes");
		socket.on("popularEmotes", handleEmoteMetaData);

		// Switch channel only if the channel changed
		if (previousChannel.current !== channelName) {
			if (isClientInitialized.current && previousChannel.current) {
				socket.emit("leave_channel", previousChannel.current);
				console.log(`Leaving channel: ${previousChannel.current}`);
			}

			// Start listening to new channel
			readChat(channelName, socket);
			isClientInitialized.current = true;
			previousChannel.current = channelName;
		}

		return () => {
			socket.off("emoteMetaData", handleEmoteMetaData); // Cleanup
		};
	}, [channelName]);

	return { channelId, setChannelId };
};
