import { describe, it, expect } from "vitest";
import { FakeClock } from "../src/limiter/clock.js";
import { createRateLimiter } from "../src/limiter/rateLimiter.js";
import { fixedWindowPolicy } from "../src/limiter/policies.js";

describe("Rate Limiter Lite", () => {
  it("1) allows requests under the limit", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").allowed).toBe(true);
  });

  it("2) blocks the request that exceeds the limit", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 2, windowMs: 1000 }),
    });

    limiter.policy.expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").allowed).toBe(false);
  });

  it("3) resets after the window passes", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 2, windowMs: 1000 }),
    });

    limiter.allow("user-1");
    limiter.allow("user-1");
    expect(limiter.allow("user-1").allowed).toBe(false);

    clock.advanceMs(1000);

    expect(limiter.allow("user-1").allowed).toBe(true);
  });

  it("4) tracks different keys independently", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 1, windowMs: 1000 }),
    });

    expect(limiter.allow("user-a").allowed).toBe(true);
    expect(limiter.allow("user-b").allowed).toBe(true);
    expect(limiter.allow("user-a").allowed).toBe(false);
    expect(limiter.allow("user-b").allowed).toBe(false);
  });

  it("5) reports remaining requests correctly", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    expect(limiter.allow("user-1").remaining).toBe(2);
    expect(limiter.allow("user-1").remaining).toBe(1);
    expect(limiter.allow("user-1").remaining).toBe(0);
  });

  it("6) blocked requests do not make remaining go below zero", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 1, windowMs: 1000 }),
    });

    limiter.allow("user-1");
    const blocked = limiter.allow("user-1");

    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
