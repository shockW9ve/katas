import type { Clock } from "./types.js";

export class RealClock implements Clock {
  private readonly startedAt: number;

  constructor() {
    this.startedAt = Date.now();
  }

  msNow(): number {
    return Date.now() - this.startedAt;
  }
}

export class FakeClock implements Clock {
  private currentMs: number;

  constructor(startMs = 0) {
    this.currentMs = startMs;
  }

  msNow(): number {
    return this.currentMs;
  }

  advanceMs(ms: number): void {
    this.currentMs += ms;
  }
}
