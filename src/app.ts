import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config/swagger";

import authRoutes from "./routes/auth.routes";
import listingRoutes from "./routes/listing.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

export default app;