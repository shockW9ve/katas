export class Policy {
  private evictionOrder: Array<string | undefined> = [];

  onGet(key: string) {
    for (let item = 0; item < this.evictionOrder.length; item++) {
      if (this.evictionOrder[item] === key) {
        const temp = this.evictionOrder[0];
        this.evictionOrder[0] = this.evictionOrder[item];
        this.evictionOrder[item] = temp;
      }
    }
  }

  onSet(key: string) {
    this.evictionOrder.push(key);
  }

  evictKey(): K | undefined {}
}
//
// export function lruPolicy(): string {
//   return "LRU";
// }

// export type Policy = "LRU" | "Normal";
