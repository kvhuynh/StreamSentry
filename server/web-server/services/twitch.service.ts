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
		console.log("sdfsdfsdf");

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

export const getEmotes = async (channelId: string) => {
	const emotes = await http.get(`7tv.io/v3/users/twitch/${channelId}`);
	console.log(emotes);
	
};

export const readChat = (channelName: string, channelId: string) => {
	const client = new tmi.Client({
		channels: [channelName],
	});

	client.connect();
	client.on("message", (channel: any, tags: any, message: any, self: any) => {
		fastApiSocket.emit("message", {
			username: tags.username,
			message: message,
		});
	});
};
