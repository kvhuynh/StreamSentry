const {
	getPopularChannels,
	readChat,
	getEmotes,
	getChannelId,
} = require("../services/twitch.service");

export const handleGetPopularChannels = async (req: any, res: any) => {
	try {
		const popularChannels = await getPopularChannels();

		return res.json(popularChannels);
	} catch (error: any) {
		console.log(error);
	}
};

export const handleGetChannelId = async (req: any, res: any) => {
	try {
		const channelId = await getChannelId(req.query.channelName);

		return res.json(channelId);
	} catch (error: any) {
		console.log(error);
	}
};

export const handleGetEmotes = async (req: any, res: any) => {
	getEmotes(req.query.channelId);
};

export const handleReadChat = async (req: any, res: any) => {
	try {
		const chat = await readChat(req.query.channelName, req.query.socket);

		return res.json(chat);
	} catch (error: any) {
		console.log(error);
	}
};
