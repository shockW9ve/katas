import type {
  ClientKey,
  RateLimitDecision,
  RateLimitRequest,
} from "./types.js";

class RateLimiter {
  private readonly clock;
  private readonly policy;

  constructor(request: RateLimitRequest) {
    this.clock = request.clock;
    this.policy = request.policy;
  }

  allow(key: ClientKey): RateLimitDecision {
    return this.policy.allow(key, this.clock.nowMs());
  }
}

export function createRateLimiter(request: RateLimitRequest): RateLimiter {
  return new RateLimiter(request);
}
