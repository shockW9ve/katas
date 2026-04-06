import type {
  RateLimitPolicy,
  RateLimitDecision,
  ClientWindow,
  PolicyConfig,
} from "./types.ts";
class FixedWindowPolicy implements RateLimitPolicy {
  private limit: number;
  private windowMs: number;

  constructor(info: PolicyConfig) {
    this.limit = info.limit;
    this.windowMs = info.windowMs;
  }

  allow(client: ClientWindow): RateLimitDecision {
    if (client.count <= this.limit) {
      return { allowed: true, remaining: this.limit - client.count };
    }

    // if (client.startMs > this.windowMs) {
    //   return { allowed: true, remaining: this.limit };
    // }

    return { allowed: false, remaining: this.limit - client.count };
  }

  adjustFixedWindow(info: PolicyConfig) {
    this.limit = info.limit;
    this.windowMs = info.windowMs;
  }
}

export function fixedWindowPolicy(info: PolicyConfig): RateLimitPolicy {
  return new FixedWindowPolicy(info);
}
