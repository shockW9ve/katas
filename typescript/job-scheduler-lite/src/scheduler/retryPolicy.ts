import type { JobId, QueuePolicy } from "./types.js";

class NoRetryPolicy implements QueuePolicy {
  // trying set instead of array for everything :)
  private queue: Set<JobId> = new Set();

  onQueued(): void {}
  onRunning(): void {}
  onComplete(): void {}
  onFail(): void {}
}

export function normalPolicy(): QueuePolicy {
  return new NoRetryPolicy();
}
