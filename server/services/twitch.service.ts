// const tmi = require('tmi.js');

// const client = new tmi.Client({
// 	channels: [ 'forsen' ]
// });

// client.connect();

// client.on('message', (channel, tags, message, self) => {
// 	// "Alca: Hello, World!"
// 	// console.log(`${tags['display-name']}: ${message}`);
// 	if (tags["subscriber"] == true) {
// 		console.log(`${tags['display-name']}: ${message}`);

// 	}
// });
import axios from "axios";

export const generateAuthorizationToken = async () => {
    // const res = await axios.get("https://id.twitch.tv/oauth2/token", {headers: { "client_id": process.env.TWITCH_CLIENT_ID, "client_secret": process.env.TWITCH_CLIENT_SECRET} });

    // process.env["TWITCH_AUTHORIZATION_TOKEN"] = 
    // console.log(res);
    // console.log(process.env.TWITCH_CLIENT_ID)

}

export const getPopularChannels = async () => {

    const http = axios.create({
        baseURL: "https://api.twitch.tv/",
        headers: {"Authorization": process.env.TWITCH_AUTHORIZATION_TOKEN, "Client-Id": process.env.TWITCH_CLIENT_ID}
    });
    try {
        console.log("here")
        const res = await http.get(`helix/streams?"first=100`);
        console.log(res.data.data);
        // console.log("here")

    } catch (error) {
        generateAuthorizationToken();
        // console.log(error);
    }
}