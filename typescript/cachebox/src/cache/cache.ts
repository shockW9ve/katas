import {
  ConcreteStrategyLRU,
  Context,
  getLRUStrategy,
  getNormalStrategy,
} from "../pattern/strategy.js";
import type { FakeClock } from "./clock.js";
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
  private context: Context;
  private clock: FakeClock;
  private policy: Policy;

  constructor(request: CacheRequest) {
    this.capacity = request.capacity;
    this.clock = request.clock;
    this.policy = request.policy;
    this.context = this.strategy();
  }

  strategy(): Context {
    if (this.policy === "LRU") {
      return getLRUStrategy();
    } else {
      return getNormalStrategy();
    }
  }

  set(key: K, value: V, ttl?: number): void {
    if (ttl) {
      this.clock.timer = ttl;
    }
    this.cache.set(key, value);

    if (this.cache.size > this.capacity && this.policy === "LRU") {
      // const context: Context = getStrategy();
      this.history = this.context.executeStrategy(
        this.cache.size,
        this.history,
        key,
      );

      const k = this.history.pop();
      this.delete(k);
    }

    if (this.cache.size > this.capacity && this.policy === "Normal") {
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
