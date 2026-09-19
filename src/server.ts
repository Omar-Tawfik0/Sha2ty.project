import app from "./app";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on: http://localhost:${PORT}`);
      console.log(`📚 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err: unknown) => {
    console.error("❌ Failed to connect to DB:", err);
  });