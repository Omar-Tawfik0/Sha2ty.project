import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);

export default app;