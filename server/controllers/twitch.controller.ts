const { getPopularChannels, readChat } = require("../services/twitch.service");

export const handleGetPopularChannels = async (req: any, res: any) => {
	try {
		const popularChannels = await getPopularChannels();

		return res.json(popularChannels);
	} catch (error: any) {
        console.log(error);
        
    }
};

export const handleReadChat = async (req: any, res: any) => {
	try {	
		console.log(req);
		
		const chat = await readChat(req.query.channelName);
		
		return res.json(chat)
	} catch (error: any) {
		console.log(error);
	}
}