import type { FakeClock, RealClock } from "./clock.js";

export interface RateLimitPolicy {
  allow(key: string, nowMs: number): RateLimitDecision;
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

export interface ClientInfo {
  limit: number;
  windowMs: number;
}

export type ClientKey = string;

export type Clock = RealClock | FakeClock;
