import { describe, it, expect, vi, afterEach } from "vitest";
import { FakeClock } from "../src/domain/limiter/clock.js";
import { createRateLimiter } from "../src/domain/limiter/rateLimiter.js";
import { fixedWindowPolicy } from "../src/domain/limiter/policies.js";

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

    expect(limiter.allow("user-1").allowed).toBe(true);
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
    expect(limiter.allow("user-1").remaining).toBe(0);

    clock.advanceMs(1000);

    expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").remaining).toBe(0);
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

  it("fixed window first request reports remaining as limit minus one", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    const result = limiter.allow("user-1");

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("fixed window after window reset reports remaining as limit minus one", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: fixedWindowPolicy({ limit: 2, windowMs: 1000 }),
    });

    limiter.allow("user-1");
    limiter.allow("user-1");
    expect(limiter.allow("user-1")).toEqual({
      allowed: false,
      remaining: 0,
    });

    clock.advanceMs(1000);

    const result = limiter.allow("user-1");

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(1);
  });
});

import { slidingWindowPolicy } from "../src/domain/limiter/policies.js";

describe("Sliding Window Policy", () => {
  it("allows requests under the limit", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").allowed).toBe(true);
    expect(limiter.allow("user-1").allowed).toBe(true);
  });

  it("blocks when too many requests happened inside the rolling window", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 2, windowMs: 1000 }),
    });

    expect(limiter.allow("user-1").allowed).toBe(true);
    clock.advanceMs(100);
    expect(limiter.allow("user-1").allowed).toBe(true);
    clock.advanceMs(100);
    expect(limiter.allow("user-1").allowed).toBe(false);
  });

  it("allows again once the oldest request falls out of the window", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 2, windowMs: 1000 }),
    });

    expect(limiter.allow("user-1").allowed).toBe(true); // t=0
    clock.advanceMs(100);
    expect(limiter.allow("user-1").allowed).toBe(true); // t=100
    clock.advanceMs(899);
    expect(limiter.allow("user-1").allowed).toBe(false); // t=999, both still count

    clock.advanceMs(1); // t=1000, the request at t=0 falls out
    expect(limiter.allow("user-1").allowed).toBe(true);
  });

  it("tracks different clients independently", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 1, windowMs: 1000 }),
    });

    expect(limiter.allow("a").allowed).toBe(true);
    expect(limiter.allow("b").allowed).toBe(true);
    expect(limiter.allow("a").allowed).toBe(false);
    expect(limiter.allow("b").allowed).toBe(false);
  });

  it("client remaining tracks correctly", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    expect(limiter.allow("a").remaining).toBe(2);
    expect(limiter.allow("a").remaining).toBe(1);
    expect(limiter.allow("a").remaining).toBe(0);
  });

  it("client remaining does not go below 0", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 1, windowMs: 1000 }),
    });

    limiter.allow("a");
    const blocked = limiter.allow("a");

    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("tracks several clients - drops old request outside of window and blocks above limit", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock: clock,
      policy: slidingWindowPolicy({
        limit: 2,
        windowMs: 999,
      }),
    });

    expect(limiter.allow("a").allowed).toBe(true);
    expect(limiter.allow("a").allowed).toBe(true);
    clock.advanceMs(333);
    expect(limiter.allow("b").allowed).toBe(true);
    clock.advanceMs(333);
    expect(limiter.allow("c").allowed).toBe(true);
    expect(limiter.allow("c").allowed).toBe(true);
    expect(limiter.allow("a").allowed).toBe(false);
    expect(limiter.allow("c").allowed).toBe(false);
    clock.advanceMs(333);
    expect(limiter.allow("a").allowed).toBe(true);
    expect(limiter.allow("b").allowed).toBe(true);
    clock.advanceMs(333);
    clock.advanceMs(333);
    expect(limiter.allow("c").allowed).toBe(true);
  });

  it("sliding window first allowed request reports remaining as limit minus one", () => {
    const clock = new FakeClock(0);
    const limiter = createRateLimiter({
      clock,
      policy: slidingWindowPolicy({ limit: 3, windowMs: 1000 }),
    });

    const result = limiter.allow("user-1");

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });
});

import { RealClock } from "../src/domain/limiter/clock.js";

describe("RealClock", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns elapsed milliseconds since construction", () => {
    const nowSpy = vi.spyOn(Date, "now");

    nowSpy.mockReturnValueOnce(1000);
    const clock = new RealClock();

    nowSpy.mockReturnValueOnce(1250);
    expect(clock.nowMs()).toBe(250);
  });
});
