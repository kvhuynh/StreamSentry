// require("dotenv").config();
require("dotenv").config();
const express = require("express");


const app = express();
const port = 8000;
app.listen(port, () => {
	console.log(`Listening on port ${port} for requests to respond to`);
});


app.use("/api/v1/twitch");

// import axios from "axios";

// export const generateAuthorizationToken = async () => {
//     const res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`);

//     process.env["TWITCH_AUTHORIZATION_TOKEN"] = `Bearer ${res.data.access_token}`
//     console.log(res.data);
// 	// console.log(process.env.TWITCH_AUTHORIZATION_TOKEN);
// 	getCurrentPopular();

// }

// export const getCurrentPopular = async () => {

//     const http = axios.create({
//         baseURL: "https://api.twitch.tv/",
// 		headers: { "Authorization": process.env.TWITCH_AUTHORIZATION_TOKEN, "Client-Id": process.env.TWITCH_CLIENT_ID }
//     });
//     try {
// 		// console.log(process.env.TWITCH_AUTHORIZATION_TOKEN)
//         const res = await http.get(`helix/streams?"first=100`);
//         console.log(res.data);
//     } catch (error) {
//         generateAuthorizationToken();
//         // console.log(error);
//     }
// }

// getCurrentPopular();
