import axios from "axios";
import config from "./config/config";

interface SentimentResponse {
  sentiment: string;
  confidence: number;
}

export default {
  async analyze(data: { username: string; message: string }): Promise<SentimentResponse> {
    try {
      const response = await axios.post<SentimentResponse>(`${config.sentimentServerUrl}/analyze`, data);
      return response.data;
    } catch (error) {
      console.error("Error contacting sentiment server:", (error as Error).message);
      throw error;
    }
  },
};
