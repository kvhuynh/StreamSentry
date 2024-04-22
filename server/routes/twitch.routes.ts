export {};

const router = express.Router();

router.get("/getPopularChannels");

module.exports = { twitchRouter: router };