import type {
  RateLimitPolicy,
  RateLimitDecision,
  ClientKey,
  ClientInfo,
} from "./types.ts";
class FixedWindowPolicy implements RateLimitPolicy {
  private clients = new Map<ClientKey, ClientInfo>();

  allow(key: string, nowMs: number): RateLimitDecision {
    // look up key
    // look up starttime for that key
    // return decision
  }

  fixedWindow(info: ClientInfo) {}
}

export function fixedWindowPolicy(): RateLimitPolicy {
  return new FixedWindowPolicy();
}
