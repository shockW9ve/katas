import type { FakeClock, RealClock } from "./clock.js";

export interface RateLimitPolicy {
  allow(client: ClientWindow): RateLimitDecision;
  adjustFixedWindow(info: PolicyConfig): void;
}

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
}

export interface RateLimitRequest {
  policy: RateLimitPolicy;
  clock: Clock;
}

export interface ClientWindow {
  count: number;
  startMs: number;
}

export interface PolicyConfig {
  limit: number;
  windowMs: number;
}

export type ClientKey = string;

export type Clock = RealClock | FakeClock;
export interface ClockConfig {
  startMs(): number;
  nowMs(): number;
}
