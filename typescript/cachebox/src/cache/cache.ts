import type { CacheRequest, Entry } from "./types.js";

export function createCache<K, V>(request: CacheRequest<K>): CacheBox<K, V> {
  return new CacheBox<K, V>(request);
}

export class CacheBox<K, V> {
  private readonly cache = new Map<K, Entry<V>>();
  private readonly capacity: number;
  private readonly clock;
  private readonly policy;

  constructor(request: CacheRequest<K>) {
    this.capacity = request.capacity;
    this.clock = request.clock;
    this.policy = request.policy;
  }

  set(key: K, value: V, ttlMs?: number): void {
    const now = this.clock.msNow();
    const expiresAt = ttlMs === undefined ? null : now + ttlMs;

    this.cache.set(key, { value, expiresAt });
    this.policy.onSet(key);

    if (this.cache.size > this.capacity) {
      const victim = this.policy.evictKey();
      if (victim !== undefined) {
        this.deleteInternal(victim);
      }
    }
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }

    if (this.isExpired(entry)) {
      this.deleteInternal(key);
      return undefined;
    }

    this.policy.onGet(key);
    return entry.value;
  }

  delete(key: K): boolean {
    return this.deleteInternal(key);
  }

  size(): number {
    this.purgeExpired();
    return this.cache.size;
  }

  private isExpired(entry: Entry<V>): boolean {
    return entry.expiresAt !== null && this.clock.msNow() >= entry.expiresAt;
  }

  private purgeExpired(): void {
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.deleteInternal(key);
      }
    }
  }

  private deleteInternal(key: K): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.policy.onDelete(key);
    }
    return deleted;
  }
}
