export class Clock {
  private dateInit: Date;

  constructor() {
    this.dateInit = new Date();
  }

  initDate() {
    return this.dateInit;
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
  private ttlStart: number;

  constructor(ttl: number) {
    this.ttlStart = ttl;
  }

  advanceMs(ttl: number): void {
    this.ttlStart = this.ttlStart - ttl;
  }
}
