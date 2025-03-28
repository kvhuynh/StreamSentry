import { useState, useEffect, useRef } from "react";

import { Socket } from "socket.io-client";
import { getEmotes } from "../services/twitch.service.api";
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
        // load emote set 
        // console.log(channelId)
        if (channelId != '') {
            console.log(`channelId is ${channelId}`);
            
            getEmotes(channelId).then((emotes) => {
                console.log(emotes);
                
            });
        }
        
        // socket.on("emote_data", handleEmoteData)
	}, []);
};

export default EmoteChart;
