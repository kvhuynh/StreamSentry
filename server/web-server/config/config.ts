import dotenv from "dotenv";

dotenv.config();

export default {
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  sentimentServerUrl: process.env.SENTIMENT_SERVER_URL || "http://localhost:7000",
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};
