import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/v1/twitch",
});

export const getPopularChannels = async () => {
	try {
		const res = await http.get("/getPopularChannels");
		console.log(res.data.data);
		
		return res.data.data;
	} catch (error) {
		console.log(error);
	}
};

export const getEmotes = async () => {
	try {
		const res = await http.get("/getEmotes");
		console.log(res.data.data);
		
	} catch (error) {
		console.log(error);
		
	}
}

export const readChat = async (channelName: string, channelId: string) => {
	try {		
		const res = await http.get("/readChat", {
			params: {
				channelName: channelName,
				channelId: channelId
			}
		});
		console.log(res.data);
		
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
