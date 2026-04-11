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
import express from "express";

export function createApp() {
  const app = express();

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  return app;
}
