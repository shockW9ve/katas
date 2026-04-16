import type { ClientKey } from "../domain/limiter/types.js";
import { RealClock } from "../domain/limiter/clock.js";
import { fixedWindowPolicy } from "../domain/limiter/policies.js";
import { createRateLimiter } from "../domain/limiter/rateLimiter.js";

export class RateLimitService {
  private readonly limiter = createRateLimiter({
    clock: new RealClock(),
    policy: fixedWindowPolicy({ limit: 3, windowMs: 1000 }),
  });

  check(key: ClientKey) {
    return this.limiter.allow(key);
  }
}

export const rateLimitService = new RateLimitService();
