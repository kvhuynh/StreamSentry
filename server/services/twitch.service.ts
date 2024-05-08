import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const tmi = require("tmi.js");
// const server = http.createServer(app);
const socketIo = require("socket.io");

let io: any;
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
		await generateAuthorizationToken(http);
	}
};

export const getPopularChannels = async () => {
	try {
		await checkAuthorizationToken(http);

		const res = await http.get(`helix/streams?"first=100`);
		parsePopularChannels(res.data);
		return res.data;
	} catch (error: any) {
		console.log(error);
	}
};

const parsePopularChannels = (data: object) => {
	console.log(data);
};

export const readChat = (channelName: string) => {
	console.log(channelName);
    const io = require('../config/socket.config').getio();
	const client = new tmi.Client({
		channels: [channelName],
	});

	client.connect();

	let words: any = [];
	client.on("message", (channel: any, tags: any, message: any, self: any) => {
		// Emit message to connected clients
		// console.log({ user: tags['display-name'], message });
		for (let word in message.split(" ")) {
			words.push(message.split(" ")[word]);
			// console.log();
		}
        // words = { user: tags['display-name'], message }
        
		io.emit('message', { user: tags['display-name'], message });
        // io.emit('message', words);

	});
        // io.emit('message', words);

};
