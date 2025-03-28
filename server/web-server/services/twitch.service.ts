import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import SevenTV from "7tv";
import fastApiSocket from "../sentimentClient";
import { emitEvent } from "../sockets/socketHandler";

const tmi = require("tmi.js");

let http: AxiosInstance = axios.create({
	baseURL: "https://api.twitch.tv/",
	headers: {
		Authorization: process.env.TWITCH_AUTHORIZATION_TOKEN,
		"Client-Id": process.env.TWITCH_CLIENT_ID,
	},
});

const generateAuthorizationToken = async (http: AxiosInstance) => {
	const res: AxiosResponse = await axios.post(
		`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
	);
	http.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
};

const checkAuthorizationToken = async (http: AxiosInstance) => {
	if (http.defaults.headers.Authorization === undefined) {
		await generateAuthorizationToken(http);
	}
};

export const getPopularChannels = async () => {
	try {
		await checkAuthorizationToken(http);

		const res = await http.get(`helix/streams?"first=200`);
		return res.data;
	} catch (error: any) {
		console.log(error);
	}
};

export const getChannelId = async (channelName: string) => {
	try {
		checkAuthorizationToken(http);
		const channelId = await http.get(`helix/users?login=${channelName}`);

		return channelId.data.data[0].id;
	} catch (error: any) {
		console.log(error);
	}
};

let currentClient: any = null;
export const readChat = async (channelName: string, socket: any) => {
	if (currentClient) {
		console.log(
			`disconnecting from old channel ${currentClient.channels[0].slice(1)}`
		);
		currentClient.part(currentClient.channels[0].slice(1));
	}

	const client = new tmi.Client({
		channels: [channelName],
	});

	currentClient = client;
	currentClient.connect();
	console.log(`Connected to ${channelName}'s chat`);
	currentClient.on(
		"message",
		(channel: any, tags: any, message: any, self: any) => {
			fastApiSocket.emit("message", {
				username: tags.username,
				message: message,
			});
			parseEmotes(message)
		}
	);
};


let currentEmotes: Map<string, object>;
export const getEmotes = async (channelId: string) => {
	try {
		const emotes = await axios.get(
			`https://7tv.io/v3/users/twitch/${channelId}`
		);
		currentEmotes = new Map(emotes.data.emote_set.emotes.map((emote: any) => [emote.name, emote]));

		
		// console.log(currentEmotes);
		
		return emotes.data;
	} catch (error: any) {
		console.log(error);
	}
};

const parseEmotes = (message: string) => {
	// console.log(currentEmotes);
	
	const words = message.split(" ");
	for (let word in words) {
		
		if (currentEmotes.has(words[word])) {
			const currWord = words[word]
			console.log(currentEmotes.get(words[word]))
			
		}
	}
	
	
// 	// emit analysis

// 	// socket.emit("emote_analysis", emote_analysis)
};
