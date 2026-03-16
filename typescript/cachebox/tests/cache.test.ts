import { describe, it, expect } from "vitest";
import { FakeClock } from "../src/cache/clock.js";
import { createCache } from "../src/cache/cache.js";
import { lruPolicy } from "../src/cache/policies.js";

describe("Cachebox", () => {
  it("1) set/get returns value", () => {
    // arrange
    const clock = new FakeClock(0);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: lruPolicy(),
    });
    // act
    cache.set("a", 1);
    // assert
    expect(cache.get("a")).toBe(1);
  });

  it("2) missing key return undefined", () => {
    // arrange
    const clock = new FakeClock(0);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: lruPolicy(),
    });
    // act
    // assert
    expect(cache.get("nope")).toBeUndefined();
  });

  it("3) overwriting key updates value and refreshes TTL if provided", () => {
    const clock = new FakeClock(0);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: lruPolicy(),
    });

    cache.add("a", 1, 1000);
    cache.add("a", 2, 1000);
    expect(cache.get("a")).toBe(2);
  });

  it("4) TTL expiry: item becomes unavailable after ttl", () => {
    const clock = new FakeClock(1000);
    const cache = createCache({
      capacity: 10,
      clock,
      policy: lruPolicy(),
    });

    cache.add("a", 1, 1000);
    clock.advanceMs(999);
    expect(cache.get("a")).toBe(1);

    clock.advanceMs(1);
    expect(cache.get("a")).toBeUndefined();
  });
});
