export {};

const {
    handleGetPopularChannels
} = require("../controllers/twitch.controller")
const express = require("express");

const router = express.Router();

router.get("/getPopularChannels", handleGetPopularChannels);

module.exports = { twitchRouter: router };