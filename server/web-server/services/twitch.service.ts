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
	console.log(http.defaults.headers.Authorization);
};

const checkAuthorizationToken = async (http: AxiosInstance) => {
	if (http.defaults.headers.Authorization === undefined) {
		console.log("sdfsdfsdf");
		
		await generateAuthorizationToken(http);
	}
};

export const getPopularChannels = async () => {
	try {
		await checkAuthorizationToken(http);

		const res = await http.get(`helix/streams?"first=100`);
		return res.data;
	} catch (error: any) {
		console.log(error);
	}
};

export const getEmotes = (channelId: string) => {
	SevenTV.getEmotes(channelId)
		.then((data: any) => {
			// console.log(data[2].data.host.files);
			return data;
		})
		.catch((error) => {
			console.log("7tv is not enabled on this channel");
		});
};

export const readChat = (channelName: string, channelId: string) => {
	// const io = require("../config/socket.config").getio();
	const client = new tmi.Client({
		channels: [channelName],
	});

	client.connect();

	let words: any = {};
	setInterval(() => {
		words = {};
	}, 10000);
	client.on("message", (channel: any, tags: any, message: any, self: any) => {
		// Emit message to connected clients
		const strippedMsg: string = message.split(" ");
		for (let i: number = 0; i < strippedMsg.length; i++) {
			// words.push(message.split(" ")[word]);
			if (!words[strippedMsg[i]]) {
				words[strippedMsg[i]] = 1;
			} else {
				words[strippedMsg[i]] = words[strippedMsg[i]] += 1;
			}
		}
		const entries: any[] = Object.entries(words);

		// Sort the array based on the values in descending order
		entries.sort((a, b) => b[1] - a[1]);

		// Slice the array to get the top 10 elements
		const top10 = entries.slice(0, 5);

		// Convert the sliced array back into an object
		const result = Object.fromEntries(top10);
		// console.log(result);

		// set a timer and reset the words after a certain period

		// return result;
		// io.emit('message', { user: tags['display-name'], message });
		// io.emit("words", result);
		// io.emit("message", {
		// 	username: tags.username,
		// 	message: message
		// });

		fastApiSocket.emit("message", {
			username: tags.username,
			message: message,
		});
		
	});
};
