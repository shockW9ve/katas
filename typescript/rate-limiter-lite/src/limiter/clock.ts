export class RealClock {}

export class FakeClock {
  private startMs;

  constructor(startMs = 0) {
    this.startMs = startMs;
  }

  nowMs() {
    return this.startMs;
  }

  advanceMs(ms: number) {
    this.startMs += ms;
  }
}
