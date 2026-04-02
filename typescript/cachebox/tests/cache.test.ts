import { describe, it, expect } from "vitest";
import { Clock, FakeClock } from "../src/cache/clock.js";
import { createCache } from "../src/cache/cache.js";
import { Policy } from "../src/cache/policies.js";

describe("Cachebox", () => {
  it("1) set/get returns value", () => {
    // arrange
    // const clock = new FakeClock(0);
    const clock = new Clock(0);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: new Policy(),
    });
    // act
    cache.set("a", 1);
    // assert
    expect(cache.get("a")).toStrictEqual([1, null]);
  });

  it("2) missing key return undefined", () => {
    // arrange
    // const clock = new FakeClock(0);
    const clock = new Clock(0);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: new Policy(),
    });
    // act
    // assert
    expect(cache.get("nope")).toBeUndefined();
  });

  it("3) overwriting key updates value and refreshes TTL if provided", () => {
    // const clock = new FakeClock(0);
    const clock = new Clock(0);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: new Policy(),
    });

    cache.set("a", 1, 1000);
    cache.set("a", 2, 1000);
    expect(cache.get("a")).toContain(2);
  });

  it("4) TTL expiry: item becomes unavailable after ttl", () => {
    // const clock = new FakeClock(1000);
    const clock = new Clock(1000);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: new Policy(),
    });
    const key = "a";
    cache.set(key, 1, 1000);
    clock.advanceMs(999);
    expect(cache.get("a")).toContain(1);

    const response = clock.advanceMs(1);
    if (response === "evict") {
      cache.delete(key);
    }
    expect(cache.get("a")).toBeUndefined();
  });

  it("5) capacity: when full, setting a new key evicts exactly one key", () => {
    const clock = new FakeClock(0);
    const cache = createCache({
      capacity: 2,
      clock,
      policy: "LRU",
    });

    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);

    // Expect size stays at capacity.
    expect(cache.size()).toBe(2);
  });

  it("6) LRU behavior: recently accessed key should not be evicted", () => {
    const clock = new FakeClock(0);
    const cache = createCache({
      capacity: 2,
      clock,
      policy: "LRU",
    });

    cache.set("a", 1);
    cache.set("b", 2);

    // touch "a" so "b" becomes least recently used
    expect(cache.get("a")).toBe(1);

    cache.set("c", 3);

    // After eviction, "a" should still exist, and "b" should be gone.
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")).toBe(3);
  });
});
