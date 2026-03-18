import type { Clock, FakeClock } from "./clock.js";
import type { Policy } from "./policies.js";
import type { CacheRequest } from "./types.js";

export class Cache extends Map<string, number> {
  // private map: Map<string, number>;
  private clock: FakeClock;
  constructor(clock: FakeClock, ttl?: number) {
    super();
    // this.map = new Map<string, number>();
    this.clock = clock;
  }

  add(key: string, value: number, ttl?: number) {
    if (ttl) {
      this.clock.timer = ttl;
    }
    this.set(key, value);
  }
  // get cache(): V | undefined {}
  // set cache(key: string): void {}
  // delete(key: string): boolean {}
  // size(): number {}
}

export function createCache(request: CacheRequest): CacheBox<string, number> {
  // const cache = new Cache(request.clock);
  const cache = new CacheBox<string, number>(request);
  //
  // request.clock.advanceMs()

  // if (request.clock.timer <= 0) {
  // cache.forEach((value, key) => {
  //   if (request.clock.timer <= 0) {
  //     cache.delete(key);
  //   }
  // });
  // }
  return cache;
}

class CacheBox<K, V> {
  private readonly cache: Map<K, V> = new Map();
  private readonly capacity: number;
  private clock: FakeClock;
  private policy: Policy;

  constructor(request: CacheRequest) {
    this.capacity = request.capacity;
    this.clock = request.clock;
    this.policy = request.policy;
  }

  add(key: K, value: V, ttl?: number): void {
    if (ttl) {
      this.clock.timer = ttl;
    }
    this.cache.set(key, value);
  }
  // set(key: string, value: number) {
  //   this.cache.set(key, value);
  // }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }
}
