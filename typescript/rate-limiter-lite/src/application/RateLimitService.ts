import type { Clock } from "../limiter/types.js";
import type { ClientKey } from "../limiter/types.js";
import { RealClock } from "../limiter/clock.js";
import { createRateLimiter } from "../limiter/rateLimiter.js";
import { fixedWindowPolicy } from "../limiter/policies.js";

export class RateLimitService {
  // private clock: Clock;
  //
  // constructor() {
  //   this.clock = new RealClock();
  // }

  check(key: ClientKey) {
    const limiter = createRateLimiter({
      clock: new RealClock(), //this.clock,
      policy: fixedWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    return limiter.allow(key);
  }
}

export function rateLimitService(key: ClientKey) {
  const service: RateLimitService = new RateLimitService();
  return service.check(key);
}
