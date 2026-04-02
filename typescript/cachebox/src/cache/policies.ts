export class Policy<K> {
  private evictionOrder: Array<K | undefined> = [];

  onGet(key: K): void {
    for (let item = 0; item < this.evictionOrder.length; item++) {
      if (this.evictionOrder[item] === key) {
        const temp = this.evictionOrder[0];
        this.evictionOrder[0] = this.evictionOrder[item];
        this.evictionOrder[item] = temp;
      }
    }
  }

  onSet(key: K): void {
    for (let item = 0; item < this.evictionOrder.length; item++) {
      if (this.evictionOrder[item] === key) {
        this.evictionOrder = this.evictionOrder.filter((item) => item !== key);
        // or simply return without filtering
      }
    }
    this.evictionOrder.push(key);
  }

  evictKey(): K | undefined {
    return this.evictionOrder.shift();
  }
}
