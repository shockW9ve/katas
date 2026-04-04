import type {
  JobId,
  NewJob,
  RetryPolicy,
  ScheduledJob,
  SchedulerBlueprint,
  SchedulerResult,
} from "./types.js";
import { maxRetryPolicy } from "./retryPolicy.js";

class Scheduler implements SchedulerBlueprint {
  private readonly queue = new Map<JobId, ScheduledJob>();
  private readonly policy: RetryPolicy = maxRetryPolicy();

  private createEnqueuedJob(job: NewJob): ScheduledJob {
    return {
      jobId: job.jobId,
      name: job.name,
      priority: job.priority,
      status: "Queued",
      attempts: 0,
      maxRetries: job.maxRetries,
    };
  }

  private priorityRank(priority: ScheduledJob["priority"]): number {
    switch (priority) {
      case "High":
        return 3;
      case "Medium":
        return 2;
      case "Low":
        return 1;
    }
  }

  enqueue(job: NewJob): SchedulerResult {
    const queuedJob = this.createEnqueuedJob(job);
    this.queue.set(queuedJob.jobId, queuedJob);
    return { ...queuedJob };
  }

  next(): SchedulerResult | undefined {
    let candidate: ScheduledJob | undefined;

    for (const job of this.queue.values()) {
      if (job.status !== "Queued") {
        continue;
      }

      if (
        !candidate ||
        this.priorityRank(job.priority) > this.priorityRank(candidate.priority)
      ) {
        candidate = job;
      }
    }

    if (!candidate) {
      return undefined;
    }

    const updated: ScheduledJob = {
      ...candidate,
      status: "Running",
      attempts: candidate.attempts + 1,
    };

    this.queue.set(updated.jobId, updated);
    return { ...updated };
  }

  markCompleted(jobId: JobId): void {
    const job = this.queue.get(jobId);
    if (!job) {
      throw new Error(`Job not found with id: ${jobId}`);
    }

    if (job.status !== "Running") {
      throw new Error("Only running jobs can be completed");
    }

    this.queue.set(jobId, { ...job, status: "Completed" });
  }

  markFailed(jobId: JobId): void {
    const job = this.queue.get(jobId);
    if (!job) {
      throw new Error(`Job not found with id: ${jobId}`);
    }

    if (job.status !== "Running") {
      throw new Error("Only running jobs can fail");
    }

    const nextStatus = this.policy.shouldRetry(job) ? "Queued" : "Failed";
    this.queue.set(jobId, { ...job, status: nextStatus });
  }

  get(jobId: JobId): SchedulerResult {
    const job = this.queue.get(jobId);
    if (!job) {
      throw new Error(`Job not found with id: ${jobId}`);
    }

    return { ...job };
  }

  all(): ReadonlyMap<JobId, ScheduledJob> {
    return new Map(this.queue);
  }
}

export function createScheduler(): SchedulerBlueprint {
  return new Scheduler();
}
