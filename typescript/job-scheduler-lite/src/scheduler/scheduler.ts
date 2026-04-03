import type { Job, JobId, SchedulerBlueprint } from "./types.js";

class Scheduler implements SchedulerBlueprint {
  private queue: Array<Job> = [];

  enqueue(job: Job): Job {
    const toQueue: Job = {
      id: job.id,
      name: job.name,
      priority: job.priority,
      status: "Queued",
      attempts: 0,
      maxRetries: job.maxRetries,
    };

    this.queue.push(toQueue);
    return toQueue;
  }

  next(): Job | null {
    for (let item of this.queue) {
      if (item.priority === "High") {
        // job.id = item.id;
        item.status = "Running";
        item.attempts! = item.attempts! + 1;
        return item;
      }
    }

    return null;
  }

  markCompleted(jobId: string): void {
    for (let item of this.queue) {
      if (item.id === jobId) {
        item.status = "Completed";
      }
    }
  }

  markFailed(jobId: string): void {
    for (let item of this.queue) {
      if (item.id === jobId) {
        if (item.attempts! <= item.maxRetries) {
          item.status = "Queued";
          return;
        }

        item.status = "Failed";
        return;
      }
    }
  }

  get(jobId: string): Job | null {
    for (let item of this.queue) {
      if (item.id === jobId) {
        return item;
      }
    }

    return null;
  }

  all(): Job[] {
    return this.queue;
  }
}

export function createScheduler() {
  return new Scheduler();
}
