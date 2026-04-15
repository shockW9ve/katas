import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimitRouter from "../api/RateLimitRoutes.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use("/api", rateLimitRouter);

  return app;
}
