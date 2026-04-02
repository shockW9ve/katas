import {
  ConcreteStrategyLRU,
  Context,
  getLRUStrategy,
  getNormalStrategy,
} from "../pattern/strategy.js";
import type { Clock, FakeClock } from "./clock.js";
import type { Policy } from "./policies.js";
import type { CacheRequest } from "./types.js";

export function createCache(request: CacheRequest): CacheBox<string, number> {
  const cache = new CacheBox<string, number>(request);
  return cache;
}

export class CacheBox<K, V> {
  // private history: Array<K | undefined> = [];
  private readonly cache: Map<K, [V, number | null]> = new Map();
  private readonly capacity: number;

  // private context: Context;
  private clock: Clock; //FakeClock;
  private policy: Policy<K>;
  // private readonly ttl: { value: number; expiresAt?: number };

  constructor(request: CacheRequest) {
    this.capacity = request.capacity;
    this.clock = request.clock;
    this.policy = request.policy;
    // this.context = this.strategy();
  }

  // strategy(): Context {
  //   if (this.policy === "LRU") {
  //     return getLRUStrategy();
  //   } else {
  //     return getNormalStrategy();
  //   }
  // }

  set(key: K, value: V, ttl?: number): void {
    // TODO:
    // check/update expiry metadata
    //
    // update value
    //
    // notify policy
    //
    // evict if over capacity
    // todo calc expires at value
    const time: number = this.clock.msNow();

    if (ttl) {
      const expireAt: number = time + ttl;
      this.cache.set(key, [value, expireAt]);
    } else {
      this.cache.set(key, [value, null]);
    }

    this.policy.onSet(key);

    if (this.cache.size > this.capacity) {
      const lru = this.policy.evictKey();
      this.delete(lru);
    }
  }

  get(key: K): V | undefined {
    this.policy.onGet(key);
    return this.cache.get(key)?.[0];
  }

  delete(key: K | undefined): void {
    if (key === undefined) {
      throw new Error("Key is missing");
    }
    this.cache.delete(key);
  }

  size(): number {
    return this.cache.size;
  }
}
