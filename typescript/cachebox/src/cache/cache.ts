import type { CacheRequest } from "./types.js";

export class Cache extends Map<string, number> {
  // private map: Map<string, number>;
  constructor() {
    super();
    // this.map = new Map<string, number>();
  }

  add(key: string, value: number, ttl?: number) {
    this.set(key, value);
  }
  // get cache(): V | undefined {}
  // set cache(key: string): void {}
  // delete(key: string): boolean {}
  // size(): number {}
}

export function createCache(request: CacheRequest): Cache {
  const cache = new Cache();
  return cache;
}
