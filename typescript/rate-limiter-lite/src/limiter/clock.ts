import type { ClockConfig } from "./types.js";

export class RealClock implements ClockConfig {
  private readonly startedAt: number;

  constructor() {
    this.startedAt = Date.now();
  }

  startMs() {
    return this.startedAt;
  }

  nowMs() {
    return Date.now() - this.startedAt;
  }
}

export class FakeClock {
  private start;

  constructor(startMs = 0) {
    this.start = startMs;
  }

  startMs() {
    return this.start;
  }

  nowMs() {
    return this.startMs;
  }

  advanceMs(ms: number) {
    this.start += ms;
  }
}
