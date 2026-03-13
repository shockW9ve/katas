import type { CacheRequest } from "./types.js";

export class Cache extends Map<string, [value: number, ttl?: number]> {
  // private map: Map<string, number>;
  constructor() {
    super();
    // this.map = new Map<string, number>();
  }

  add(key: string, value: number, ttl?: number) {
    if (ttl) {
      this.set(key, [value, ttl]);
      return;
    }
    this.set(key, [value]);
  }
  // get cache(): V | undefined {}
  // set cache(key: string): void {}
  // delete(key: string): boolean {}
  // size(): number {}
}

export function createCache(request: CacheRequest): Cache {
  const cache = new Cache();
  // request.clock.advanceMs()

  // if (request.clock.timer <= 0) {
  cache.forEach((value, key) => {
    if (request.clock.timer === 0) {
      cache.delete(key);
    }
  });
  // }
  return cache;
}
