import { Router } from "express";
import { rateLimitService } from "../application/RateLimitService.js";
import type { ClientKey } from "../domain/limiter/types.js";

const rateLimitRouter = Router();

// GET health
rateLimitRouter.get("/health", (_request, response) => {
  response.json({ ok: true });
});

// POST check
rateLimitRouter.post("/check", (request, response) => {
  const { key } = request.body;
  const result = rateLimitService.check(key);

  response
    .status(200)
    .json({ allowed: result.allowed, remaining: result.remaining });
});

export default rateLimitRouter;
