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

  response.status(201).json({ key: key });
  // const clientKey: ClientKey = request.body.key;
  // // call service
  // rateLimitService(clientKey);
  // check for errors
  // respond accordingly
});

export default rateLimitRouter;
