export type ClientKey = string;

export type RateLimitDecision = {
  allowed: boolean;
  remaining: number;
};

export interface Clock {
  nowMs(): number;
}

export type PolicyConfig = {
  limit: number;
  windowMs: number;
};

export type ClientWindow = {
  count: number;
  windowStartMs: number;
};

export interface RateLimitPolicy {
  allow(key: ClientKey, nowMs: number): RateLimitDecision;
}

export type RateLimitRequest = {
  clock: Clock;
  policy: RateLimitPolicy;
};
