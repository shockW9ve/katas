import { response, Router } from "express";
import { rateLimitService } from "../application/RateLimitService.js";
import type { ClientKey } from "../limiter/types.js";

const rateLimitRouter = Router();

// GET health
rateLimitRouter.get("/health", (request, response) => {
  response.json({ health: "Server status ok" });
});

// POST check
rateLimitRouter.post("/check", (request, response) => {
  const { key } = request.body.key;
  const result = rateLimitService(key);

  if (!result) {
    response.status(500).json({ error: "Something went wrong on the server" });
  }

  response
    .status(201)
    .json({ allowed: result.allowed, remaining: result.remaining });
});

export default rateLimitRouter;
