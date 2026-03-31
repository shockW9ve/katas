export class Policy {
  onGet(key: string) {}
  onSet(key: string) {}
  evictKey(): K | undefined {}
}
//
// export function lruPolicy(): string {
//   return "LRU";
// }

// export type Policy = "LRU" | "Normal";
