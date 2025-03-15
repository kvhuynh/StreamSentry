export {};

const {
    handleGetPopularChannels,
    handleGetChannelId,
    handleGetEmotes,
    handleReadChat,
} = require("../controllers/twitch.controller")
const express = require("express");

const router = express.Router();

router.get("/getPopularChannels", handleGetPopularChannels);
router.get("/getChannelId", handleGetChannelId);
router.get("/getEmotes", handleGetEmotes)
router.get("/readChat", handleReadChat)

module.exports = { twitchRouter: router };