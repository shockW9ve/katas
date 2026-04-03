import type { QueuePolicy } from "./types.js";

class NoRetryPolicy implements QueuePolicy {
  onQueued(): void {}
  onRunning(): void {}
  onComplete(): void {}
  onFail(): void {}
}

export function normalPolicy() {
  return new NoRetryPolicy();
}
