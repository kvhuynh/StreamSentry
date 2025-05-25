// import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
// import SevenTV from "7tv";
// import fastApiSocket from "../sentimentClient";
// import { emitEvent } from "../sockets/socketHandler";

// const tmi = require("tmi.js");

// let http: AxiosInstance = axios.create({
// 	baseURL: "https://api.twitch.tv/",
// 	headers: {
// 		Authorization: process.env.TWITCH_AUTHORIZATION_TOKEN,
// 		"Client-Id": process.env.TWITCH_CLIENT_ID,
// 	},
// });

// const generateAuthorizationToken = async (http: AxiosInstance) => {
// 	const res: AxiosResponse = await axios.post(
// 		`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
// 	);
// 	http.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
// };

// const checkAuthorizationToken = async (http: AxiosInstance) => {
// 	if (http.defaults.headers.Authorization === undefined) {
// 		await generateAuthorizationToken(http);
// 	}
// };

// export const getPopularChannels = async () => {
// 	try {
// 		await checkAuthorizationToken(http);

// 		const res = await http.get(`helix/streams?"first=200`);
// 		return res.data;
// 	} catch (error: any) {
// 		console.log(error);
// 	}
// };

// export const getChannelId = async (channelName: string) => {
// 	try {
// 		checkAuthorizationToken(http);
// 		const channelId = await http.get(`helix/users?login=${channelName}`);

// 		return channelId.data.data[0].id;
// 	} catch (error: any) {
// 		console.log(error);
// 	}
// };

// let currentClient: any = null;
// export const readChat = async (channelName: string, socket: any) => {
// 	if (currentClient) {
// 		console.log(
// 			`disconnecting from old channel ${currentClient.channels[0].slice(1)}`
// 		);
// 		currentClient.part(currentClient.channels[0].slice(1));
// 	}

// 	const client = new tmi.Client({
// 		channels: [channelName],
// 	});

// 	currentClient = client;
// 	currentClient.connect();
// 	console.log(`Connected to ${channelName}'s chat`);
// 	currentClient.on(
// 		"message",
// 		(channel: any, tags: any, message: any, self: any) => {
// 			fastApiSocket.emit("message", {
// 				username: tags.username,
// 				message: message,
// 			});



// 			let emoteData = parseEmotes(message);
// 			if (emoteData != null) {
// 				emitEvent("emoteMetaData", emoteData);
// 			}
// 		}
// 	);
// };

// let currentEmotes: Map<string, object>;
// export const getEmotes = async (channelId: string) => {
// 	try {
// 		const emotes = await axios.get(
// 			`https://7tv.io/v3/users/twitch/${channelId}`
// 		);
// 		currentEmotes = new Map(
// 			emotes.data.emote_set.emotes.map((emote: any) => [emote.name, emote])
// 		);

// 		return emotes.data;
// 	} catch (error: any) {
// 		console.log(error);
// 	}
// };

// const parseEmotes = (message: string) => {

// 	// Splits incoming message
// 	const words = message.split(" ");
// 	for (let word in words) {
// 		const currWord = words[word];

// 		// Checks if word is exists in currentEmotes
// 		if (currentEmotes.has(currWord)) {
// 			return currentEmotes.get(currWord);
// 		}
// 	}
// };

// let emoteCounts = new Map();

// setInterval(() => {
//   // Find most used emote
//   const sorted = Array.from(emoteCounts.entries()).sort((a, b) => b[1] - a[1]);
//   const [topEmote, count] = sorted[0] || [];

//   // Emit to frontend
//   if (topEmote) {
//     io.emit("popular_emote", { emote: topEmote, count });
//   }

//   // Clear for next time window
//   emoteCounts.clear();
// }, 10000); // every 10s

// // On message parse:
// if (emoteFound) {
//   emoteCounts.set(emote, (emoteCounts.get(emote) || 0) + 1);
// }

import axios, { AxiosInstance, AxiosResponse } from "axios";
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

// Twitch Auth Handling
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

// Twitch API: Get Channel ID
export const getChannelId = async (channelName: string) => {
	try {
		await checkAuthorizationToken(http);
		const res = await http.get(`helix/users?login=${channelName}`);
		return res.data.data[0].id;
	} catch (error) {
		console.log(error);
	}
};

// 🔵 EMOTE STORAGE
let currentEmotes: Map<string, object> = new Map();

// 🔵 EMOTE COUNTS FOR INTERVAL AGGREGATION
let emoteCounts = new Map<string, number>();

// Emit top emote every 10 seconds
setInterval(() => {
	if (emoteCounts.size === 0) return;

	// Convert Map to sorted array of emotes
	const sorted = Array.from(emoteCounts.entries()).sort((a, b) => b[1] - a[1]);
  
	// Emit all emote counts
	emitEvent("popularEmotes", sorted.map(([emote, count]) => ({ emote, count })));
  
	// Clear for next window
	emoteCounts.clear();

	emoteCounts.clear(); // Reset for next window
}, 10000);

// 🔵 GET CHANNEL EMOTES FROM 7TV
export const getEmotes = async (channelId: string) => {
	try {
		const emotes = await axios.get(
			`https://7tv.io/v3/users/twitch/${channelId}`
		);
		currentEmotes = new Map(
			emotes.data.emote_set.emotes.map((emote: any) => [emote.name, emote])
		);
		return emotes.data;
	} catch (error) {
		console.log(error);
	}
};

// 🔵 PARSE EMOTES IN MESSAGE
const parseEmotes = (message: string): string | null => {
	const words = message.split(" ");
	for (const word of words) {
		if (currentEmotes.has(word)) return word;
	}
	return null;
};

// 🔵 MAIN CHAT HANDLER
let currentClient: any = null;

export const readChat = async (channelName: string, socket: any) => {
	if (currentClient) {
		console.log(
			`disconnecting from old channel ${currentClient.channels[0].slice(1)}`
		);
		await currentClient.part(currentClient.channels[0].slice(1)).catch(console.error);
	}

	const client = new tmi.Client({
		channels: [channelName],
	});

	currentClient = client;
	await currentClient.connect();

	console.log(`Connected to ${channelName}'s chat`);

	client.on("message", (channel: any, tags: any, message: any, self: any) => {
		if (self) return;

		// Emit raw chat message
		fastApiSocket.emit("message", {
			username: tags.username,
			message: message,
		});

		// Handle emotes
		const emoteName = parseEmotes(message);
		if (emoteName) {
			// Increase emote count
			emoteCounts.set(emoteName, (emoteCounts.get(emoteName) || 0) + 1);

			// Optional: Emit full metadata (you already had this)
			const emoteMeta = currentEmotes.get(emoteName);
			if (emoteMeta) emitEvent("emoteMetaData", emoteMeta);
		}
	});
};
