import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost/api/v1/twitch"
});

export const getPopularChannels = async () => {
    const res = await http.get("/getChannels");
    return res.data;
}

