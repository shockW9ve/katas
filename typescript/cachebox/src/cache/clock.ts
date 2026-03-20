import { Cache, CacheBox } from "./cache.js";
export class Clock {
  private dateInit: Date;

  constructor() {
    this.dateInit = new Date();
  }

  msNow(): number {
    const dateNow: Date = new Date();
    const ms: number = dateNow.getTime();
    const time: number = ms - this.dateInit.getTime();
    return time;
  }

  toString() {
    console.log(`Clock init date ${this.dateInit}`);
  }
}

export class FakeClock {
  private ttl: number;
  private start: number;

  constructor(ttl: number) {
    this.ttl = ttl;
    this.start = ttl;
  }

  advanceMs(tick: number, cache: CacheBox<string, number>, key: string) {
    this.ttl = this.ttl - tick;
    if (this.ttl <= 0) {
      cache?.delete(key);
    }
  }

  set timer(time: number) {
    this.ttl = time;
  }

  get timer() {
    return this.ttl;
  }

  get starter() {
    return this.start;
  }
}
