import type { JobId, RetryPolicy, ScheduledJob } from "./types.js";

class MaxRetryPolicy implements RetryPolicy {
  shouldRetry(job: ScheduledJob): boolean {
    return job.attempts <= job.maxRetries;
  }
}

export function maxRetryPolicy(): RetryPolicy {
  return new MaxRetryPolicy();
}
