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
  constructor(ttl: number) {
    this.ttl = ttl;
  }
}
