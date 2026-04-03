export interface Clock {
  msNow(): number;
}

export type Entry<V> = {
  value: V;
  expiresAt: number | null;
};

export interface EvictionPolicy<K> {
  onGet(key: K): void;
  onSet(key: K): void;
  onDelete(key: K): void;
  evictKey(): K | undefined;
}

export type CacheRequest<K> = {
  capacity: number;
  clock: Clock;
  policy: EvictionPolicy<K>;
};
