import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/v1/twitch",
});

export const getPopularChannels = async () => {
	try {
		console.log("jaslfkjasldfkjasldkfjs");
		const res = await http.get("/getPopularChannels");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
