export class Policy {
  private evictionOrder: Array<string | undefined> = [];

  onGet(key: string): void {
    for (let item = 0; item < this.evictionOrder.length; item++) {
      if (this.evictionOrder[item] === key) {
        const temp = this.evictionOrder[0];
        this.evictionOrder[0] = this.evictionOrder[item];
        this.evictionOrder[item] = temp;
      }
    }
  }

  onSet(key: string): void {
    this.evictionOrder.push(key);
  }

  evictKey(): string | undefined {
    return this.evictionOrder.pop();
  }
}
