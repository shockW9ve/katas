import type {
  ClientKey,
  RateLimitPolicy,
  RateLimitRequest,
  Window,
} from "./types.js";

class RateLimiter {
  private readonly map = new Map<ClientKey, ClientWindow>();
  private readonly policy;
  private readonly clock;

  constructor(request: RateLimitRequest) {
    this.policy = request.policy;
    this.clock = request.clock;
  }

  allow(key: string, nowMs: number) {
    this.policy.allow(key, nowMs);
  }
}
