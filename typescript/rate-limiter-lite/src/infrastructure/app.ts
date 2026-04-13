// import express, { request, response } from "express";
// import rateLimitRouter from "../api/RateLimitRoutes.js";
//
// const app = express();
// const port = 3000;
//
// app.use(express.json());
//
// app.use("/api/ratelimit", rateLimitRouter);
//
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
//
// import express, { Application } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimitRouter from "../api/RateLimitRoutes.js";

export function createApp() {
  // const app: Application = express();
  const app = express();
  // app.use(cors());
  // app.use(helmet());
  app.use(express.json());
  app.use("/api", rateLimitRouter);

  // app.get("/health", (_req, res) => {
  //   res.json({ ok: true });
  // });

  return app;
}
