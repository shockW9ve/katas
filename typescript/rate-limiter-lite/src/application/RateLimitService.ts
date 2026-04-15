import type { Clock } from "../limiter/types.js";
import type { ClientKey } from "../limiter/types.js";
import { RealClock } from "../limiter/clock.js";
import { createRateLimiter } from "../limiter/rateLimiter.js";
import { fixedWindowPolicy } from "../limiter/policies.js";

export class RateLimitService {
  private readonly limiter = createRateLimiter({
    clock: new RealClock(), //this.clock,
    policy: fixedWindowPolicy({ limit: 3, windowMs: 1000 }),
  });

  check(key: ClientKey) {
    return this.limiter.allow(key);
  }
}

export const rateLimitService = new RateLimitService();
