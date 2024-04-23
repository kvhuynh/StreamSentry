const { getPopularChannels } = require("../services/twitch.service");

export const handleGetPopularChannels = async (req: any, res: any) => {
	try {
		const popularChannels = await getPopularChannels();

		return res.json(popularChannels);
	} catch (error: any) {
        console.log(error);
        
    }
};
