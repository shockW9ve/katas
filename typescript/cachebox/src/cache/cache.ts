import type { CacheRequest } from "./types.js";

export class Cache extends Map<string, number> {
  constructor() {
    super();
  }

  get cache(): V | undefined {}
  set cache(key: string): void {}
  delete(key: string): boolean {}
  size(): number {}
}

export function createCache<string, number>(request: CacheRequest) {}
