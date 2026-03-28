import { ConcreteStrategyLRU, Context } from "../pattern/strategy.js";

export class Policy {
  onGet(key: string) {}
  onSet(key: string) {}
  evictKey(): K | undefined {}
}

export function lruPolicy(): string {
  return "LRU";
}
