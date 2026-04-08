import type {
  ClientKey,
  ClientWindow,
  PolicyConfig,
  RateLimitDecision,
  RateLimitPolicy,
} from "./types.js";

class FixedWindowPolicy implements RateLimitPolicy {
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly clients = new Map<ClientKey, ClientWindow>();

  constructor(config: PolicyConfig) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
  }

  allow(key: ClientKey, nowMs: number): RateLimitDecision {
    const current = this.clients.get(key);

    if (!current) {
      this.clients.set(key, {
        count: 1,
        windowStartMs: nowMs,
      });

      return {
        allowed: true,
        remaining: this.limit - 1,
      };
    }

    const windowExpired = nowMs >= current.windowStartMs + this.windowMs;

    if (windowExpired) {
      this.clients.set(key, {
        count: 1,
        windowStartMs: nowMs,
      });

      return {
        allowed: true,
        remaining: this.limit - 1,
      };
    }

    if (current.count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
      };
    }

    const updated: ClientWindow = {
      count: current.count + 1,
      windowStartMs: current.windowStartMs,
    };

    this.clients.set(key, updated);

    return {
      allowed: true,
      remaining: this.limit - updated.count,
    };
  }
}

class SlidingWindowPolicy implements RateLimitPolicy {
  private readonly limit;
  private readonly windowMs;
  private readonly clients = new Map<ClientKey, number[]>();

  constructor(config: PolicyConfig) {
    this.limit = config.limit;
    this.windowMs = config.windowMs;
  }

  allow(key: ClientKey, nowMs: number): RateLimitDecision {
    const client = this.clients.get(key);

    if (!client) {
      this.clients.set(key, [nowMs]);
      return { allowed: true, remaining: this.limit - 1 };
    }
    // todo
    // any timestamp older than nowMs - windowMs should no longer count
    //age = nowMs - t
    // And then ask:
    //
    // is age < windowMs ?
    //read client timestamps or empty array
    // clean with a filter based on timestamp age
    // if cleaned length >= limit → block
    // else append nowMs, save, allow

    // allow again when oldest request falls out of window
    if (client.length >= this.limit) {
      if (this.windowMs - nowMs === 0) {
        console.log(this.windowMs - nowMs);
        const remove: number[] = client.filter(
          (t) => t === this.windowMs - nowMs,
        );

        this.clients.set(key, [...remove]);

        return { allowed: true, remaining: this.limit - remove.length };
      }
    }

    // block with to many request within the window
    if (nowMs > this.windowMs || client.length >= this.limit) {
      return { allowed: false, remaining: 0 };
    }

    // tracks different clients indepedently

    // allow request under the limit
    const updated: number[] = [...client, nowMs];

    this.clients.set(key, updated);

    return { allowed: true, remaining: this.limit - updated.length };
  }
}

export function fixedWindowPolicy(config: PolicyConfig): RateLimitPolicy {
  return new FixedWindowPolicy(config);
}

export function slidingWindowPolicy(config: PolicyConfig): RateLimitPolicy {
  return new SlidingWindowPolicy(config);
}
