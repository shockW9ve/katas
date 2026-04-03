import type {
  Job,
  JobId,
  QueuePolicy,
  SchedulerBlueprint,
  SchedulerResult,
} from "./types.js";

import { normalPolicy } from "./retryPolicy.js";

class Scheduler implements SchedulerBlueprint {
  private queue: Map<JobId, Job> = new Map();
  private policy: QueuePolicy = normalPolicy();

  private buildJob(job: Job): SchedulerResult {
    return {
      jobId: job.jobId, //{ id: job.jobId.id },
      name: job.name,
      priority: job.priority,
      status: "Queued",
      attempts: 0,
      maxRetries: job.maxRetries,
    };
  }

  enqueue(job: Job): SchedulerResult {
    const toQueue = this.buildJob(job);

    this.queue.set(toQueue.jobId, toQueue);
    return toQueue;
  }

  next(): SchedulerResult | undefined {
    // todo initialize objects
    // only look at jobs with status queued
    let high: SchedulerResult, mid: Job, low: Job;

    this.queue.forEach((value) => {
      if (value.priority === "High") {
        high = value;
      } else if (value.priority === "Medium") {
        mid = value;
      } else {
        low = value;
      }
    });

    if (high) {
      high.status = "Running";
      high.attempts += 1;
      this.queue.set(high.jobId, high);
      return high;
    } else if (mid) {
      mid.status = "Running";
      mid.attempts += 1;
      this.queue.set(mid.jobId, mid);
      return mid;
    } else {
      low.status = "Running";
      low.attempts += 1;
      this.queue.set(low.jobId, low);
      return low;
    }
  }

  markCompleted(jobId: JobId): void {
    const job = this.queue.get(jobId);
    if (!job) {
      throw new Error(`Job not found with id: ${jobId.id}`);
    }

    job.status! = "Completed";
    this.queue.set(jobId, job);
  }

  markFailed(jobId: JobId): void {
    const job = this.queue.get(jobId);
    if (!job || !job.attempts) {
      throw new Error(`Job not found with id: ${jobId.id}`);
    }

    if (job.attempts <= job.maxRetries) {
      job.status = "Queued";
    } else {
      job.status = "Failed";
    }

    this.queue.set(jobId, job);
  }

  get(jobId: JobId): SchedulerResult {
    const job = this.queue.get(jobId);
    if (!job) {
      throw new Error(`Job not found with id: ${jobId.id}`);
    }

    const toQueue = this.buildJob(job);

    return toQueue;
  }

  all(): Map<JobId, Job> {
    // enqueue all jobs or just return the queue?
    return this.queue;
  }
}

export function createScheduler() {
  return new Scheduler();
}
