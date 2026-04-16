import { Router } from "express";
import { rateLimitService } from "../../../application/RateLimitService.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

router.post("/check", (req, res) => {
  const { key } = req.body;

  if (typeof key !== "string" || key.trim() === "") {
    return res.status(400).json({ error: "key must be a non-empty string" });
  }

  const result = rateLimitService.check(key);

  return res.status(200).json(result);
});

export default router;
