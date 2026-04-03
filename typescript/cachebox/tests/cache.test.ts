import { describe, it, expect } from "vitest";
import { createCache } from "../src/cache/cache.js";
import { FakeClock, RealClock } from "../src/cache/clock.js";
import { lruPolicy, normalPolicy } from "../src/cache/policies.js";

describe("CacheBox", () => {
  it("1) set/get returns value", () => {
    const clock = new RealClock();
    const cache = createCache<string, number>({
      capacity: 10,
      clock,
      policy: normalPolicy<string>(),
    });

    cache.set("a", 1);

    expect(cache.get("a")).toBe(1);
  });

  it("2) missing key returns undefined", () => {
    const clock = new RealClock();
    const cache = createCache<string, number>({
      capacity: 10,
      clock,
      policy: normalPolicy<string>(),
    });

    expect(cache.get("nope")).toBeUndefined();
  });

  it("3) overwriting key updates value and refreshes TTL if provided", () => {
    const clock = new FakeClock(0);
    const cache = createCache<string, number>({
      capacity: 10,
      clock,
      policy: normalPolicy<string>(),
    });

    cache.set("a", 1, 1000);
    clock.advanceMs(500);
    cache.set("a", 2, 1000);

    clock.advanceMs(600);
    expect(cache.get("a")).toBe(2);
  });

  it("4) TTL expiry: item becomes unavailable after ttl", () => {
    const clock = new FakeClock(0);
    const cache = createCache<string, number>({
      capacity: 10,
      clock,
      policy: normalPolicy<string>(),
    });

    cache.set("a", 1, 1000);

    clock.advanceMs(999);
    expect(cache.get("a")).toBe(1);

    clock.advanceMs(1);
    expect(cache.get("a")).toBeUndefined();
  });

  it("5) capacity: when full, setting a new key evicts exactly one key", () => {
    const clock = new FakeClock(0);
    const cache = createCache<string, number>({
      capacity: 2,
      clock,
      policy: lruPolicy<string>(),
    });

    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    expect(cache.size()).toBe(2);
  });

  it("6) LRU behavior: recently accessed key should not be evicted", () => {
    const clock = new FakeClock(0);
    const cache = createCache<string, number>({
      capacity: 2,
      clock,
      policy: lruPolicy<string>(),
    });

    cache.set("a", 1);
    cache.set("b", 2);

    expect(cache.get("a")).toBe(1);

    cache.set("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")).toBe(3);
  });
});
