import config from "./config/config";
import { io as socketIoClient } from "socket.io-client";

const fastApiSocket = socketIoClient(config.sentimentServerUrl, {
    transports: ["websocket", "polling"], // Specify transport methods explicitly
});

fastApiSocket.on("connect", () => {
    console.log("✅ Sentiment Server connected");
    fastApiSocket.emit("message", { message: "hello" });
});

fastApiSocket.on("disconnect", () => {
    console.log("⚠️ Sentiment Server disconnected");
});

fastApiSocket.on("sentiment_result", (data: any) => {
    console.log("Received response from FastAPI:", data);
});

export default fastApiSocket;


// import axios from "axios";
// import config from "./config/config";

// interface SentimentResponse {
//   sentiment: string;
//   confidence: number;
// }

// export default {
//   async analyze(data: { username: string; message: string }): Promise<SentimentResponse> {
//     try {
//       const response = await axios.post<SentimentResponse>(`${config.sentimentServerUrl}/analyze`, data);
//       return response.data;
//     } catch (error) {
//       console.error("Error contacting sentiment server:", (error as Error).message);
//       throw error;
//     }
//   },
// };
