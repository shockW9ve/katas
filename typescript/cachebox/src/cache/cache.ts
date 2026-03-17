import type { Clock, FakeClock } from "./clock.js";
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

export function createCache(request: CacheRequest): Cache {
  const cache = new Cache(request.clock);
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
