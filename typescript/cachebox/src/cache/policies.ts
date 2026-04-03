import type { EvictionPolicy } from "./types.js";

export class NoopPolicy<K> implements EvictionPolicy<K> {
  onGet(_key: K): void {}
  onSet(_key: K): void {}
  onDelete(_key: K): void {}
  evictKey(): K | undefined {
    return undefined;
  }
}

export class LruPolicy<K> implements EvictionPolicy<K> {
  private order: K[] = [];

  private touch(key: K): void {
    this.order = this.order.filter((k) => k !== key);
    this.order.push(key);
  }

  onGet(key: K): void {
    this.touch(key);
  }

  onSet(key: K): void {
    this.touch(key);
  }

  onDelete(key: K): void {
    this.order = this.order.filter((k) => k !== key);
  }

  evictKey(): K | undefined {
    return this.order.shift();
  }
}

export function normalPolicy<K>(): EvictionPolicy<K> {
  return new NoopPolicy<K>();
}

export function lruPolicy<K>(): EvictionPolicy<K> {
  return new LruPolicy<K>();
}
