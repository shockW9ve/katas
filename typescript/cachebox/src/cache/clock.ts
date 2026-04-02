export class Clock {
  private dateInit: Date;
  private expire: number;

  constructor(init: number) {
    this.dateInit = new Date();
    this.expire = init;
  }

  initDate() {
    return this.dateInit;
  }

  timeNow(): number {
    const date: Date = new Date();
    const ms: number = date.getTime();
    return ms;
  }

  calculateExpire(time: number, ttl?: number): number {
    if (!ttl) {
      return time;
    }
    this.expire = time + ttl;
    return time + ttl;
  }

  // msNow(): number {
  //   const dateNow: Date = new Date();
  //   const ms: number = dateNow.getTime();
  //   const time: number = ms - this.dateInit.getTime();
  //   return time;
  // }
  //
  advanceMs(ttl: number): string {
    const current = this.expire;
    this.expire = this.expire - ttl;
    if (this.expire <= current) {
      return "evict";
    } else {
      return "safe";
    }
    // const dateNow: Date = new Date();
    // const ms: number = dateNow.getTime();
    // const time: number = ms - ttl;
    // return time;
  }

  toString() {
    console.log(`Clock init date ${this.dateInit}`);
  }
}

export class FakeClock {
  private ttl: number;
  // private start: number;

  constructor(ttl: number) {
    this.ttl = ttl;
    // this.start = ttl;
  }

  // advanceMs(tick: number, cache: CacheBox<string, number>, key: string) {
  //   this.ttl = this.ttl - tick;
  //   if (this.ttl <= 0) {
  //     cache?.delete(key);
  //   }
  // }
  //
  // set timer(time: number) {
  //   this.ttl = time;
  // }
  //
  // get timer() {
  //   return this.ttl;
  // }
  //
  // get starter() {
  //   return this.start;
  // }
}
