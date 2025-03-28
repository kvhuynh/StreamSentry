import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:3000/api/v1/twitch",
});

export const getPopularChannels = async () => {
	try {
		const res = await http.get("/getPopularChannels");
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const getChannelId = async (channelName: string) => {
	try {
		const res = await http.get("/getChannelId", {
			params: {
				channelName: channelName,
			},
		});
		console.log(` get channelId = ${res.data}`);
		
		return res.data
	} catch (error) {
		console.log(error);
	}
};

export const getEmotes = async (channelId: string) => {
	console.log(`${channelId} in getEmotes twitch service api`);
	
	try {
		const res = await http.get("/getEmotes", {
			params: {
				channelId: channelId,
			},
		});
		// console.log(res.data.data);
		return res.data
	} catch (error) {
		console.log(error);
	}
};

export const readChat = async (channelName: string, socket: any) => {
	try {
		console.log(`reading ${channelName}`);
		
		const res = await http.get("/readChat", {
			params: {
				channelName: channelName,
				// channelId: channelId
				socket: socket
			},
		});
		console.log(res.data);

		return res.data;
	} catch (error) {
		console.log(error);
	}
};
