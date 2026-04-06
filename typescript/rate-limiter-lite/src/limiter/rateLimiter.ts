import type {
  ClientKey,
  ClientWindow,
  RateLimitDecision,
  RateLimitPolicy,
  RateLimitRequest,
} from "./types.js";

class RateLimiter {
  private readonly map = new Map<ClientKey, ClientWindow>();
  private readonly policy;
  private readonly clock;

  constructor(request: RateLimitRequest) {
    this.policy = request.policy;
    this.clock = request.clock;
  }

  allow(key: string): RateLimitDecision {
    // ms now
    //find client
    const client = this.map.get(key);
    //if not found set client
    if (client === undefined) {
      this.map.set(key, { count: 1, startMs: this.clock.startMs() });
    } else {
      this.map.set(key, {
        count: client.count + 1,
        startMs: client.startMs,
      });
    }

    const refreshedClient = this.map.get(key);

    if (refreshedClient === undefined) {
      throw new Error();
    }

    //ask policy if ok

    const response = this.policy.allow(refreshedClient);

    if (response.remaining <= 0) {
      this.map.set(key, { count: 0, startMs: refreshedClient.startMs });
    }

    return response;
  }
}

export function createRateLimiter(request: RateLimitRequest) {
  return new RateLimiter(request);
}
