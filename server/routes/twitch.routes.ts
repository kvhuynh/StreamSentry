export {};

const {
    handleGetPopularChannels,
    hanldeGetEmotes,
    handleReadChat
} = require("../controllers/twitch.controller")
const express = require("express");

const router = express.Router();

router.get("/getPopularChannels", handleGetPopularChannels);
router.get("/getEmotes", handleGetEmotes)
router.get("/readChat", handleReadChat)

module.exports = { twitchRouter: router };