import {
  ConcreteStrategyLRU,
  Context,
  getStrategy,
} from "../pattern/strategy.js";
import type { Clock, FakeClock } from "./clock.js";
import type { Policy } from "./policies.js";
import type { CacheRequest } from "./types.js";

export class Cache extends Map<string, number> {
  private clock: FakeClock;

  constructor(clock: FakeClock) {
    super();
    this.clock = clock;
  }

  add(key: string, value: number, ttl?: number) {
    if (ttl) {
      this.clock.timer = ttl;
    }
    this.set(key, value);
  }
}

export function createCache(request: CacheRequest): CacheBox<string, number> {
  const cache = new CacheBox<string, number>(request);
  return cache;
}

export class CacheBox<K, V> {
  private history: Array<K | undefined> = [];
  private readonly cache: Map<K, V> = new Map();
  private readonly capacity: number;
  private clock: FakeClock;
  private policy: string;

  constructor(request: CacheRequest) {
    this.capacity = request.capacity;
    this.clock = request.clock;
    this.policy = request.policy;
  }

  set(key: K, value: V, ttl?: number): void {
    if (ttl) {
      this.clock.timer = ttl;
    }
    this.cache.set(key, value);

    if (this.cache.size > this.capacity && this.policy === "LRU") {
      // for (let i = 0; i < this.cache.size; i++) {
      //   if (this.history[i] === key) {
      //     const temp = this.history[0];
      //     this.history[0] = this.history[i];
      //     this.history[i] = temp;
      //   }
      // }
      const context: Context = getStrategy();
      this.history = context.executeStrategy(
        this.cache.size,
        this.history,
        key,
      );

      const k = this.history.pop();
      this.delete(k);
    }

    if (this.cache.size > this.capacity || this.policy !== "LRU") {
      const key = this.history[0];
      this.delete(key);
    }

    this.history.push(key);
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
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
