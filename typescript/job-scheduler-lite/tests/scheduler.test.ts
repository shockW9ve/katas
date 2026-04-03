import { describe, it, expect } from "vitest";
import { createScheduler } from "../src/scheduler/scheduler.js";
import { JobId } from "../src/scheduler/types.js";

describe("Job Scheduler Lite", () => {
  it("1) enqueue creates a queued job", () => {
    const scheduler = createScheduler();

    const job = scheduler.enqueue({
      jobId: { id: "job-1" },
      name: "Import customers",
      priority: "Medium",
      maxRetries: 2,
    });

    expect(job.status).toBe("Queued");
    expect(job.attempts).toBe(0);
    expect(scheduler.get(job.jobId)).toEqual(job);
  });

  it("2) next picks the highest priority queued job", () => {
    const scheduler = createScheduler();

    scheduler.enqueue({
      jobId: { id: "job-1" },
      name: "Low",
      priority: "Low",
      maxRetries: 1,
    });

    scheduler.enqueue({
      jobId: { id: "job-2" },
      name: "High",
      priority: "High",
      maxRetries: 1,
    });

    scheduler.enqueue({
      jobId: { id: "job-3" },
      name: "Mid",
      priority: "Medium",
      maxRetries: 1,
    });

    const next = scheduler.next();

    expect(scheduler.all().size).toBe(3);
    expect(next?.jobId.id).toBe("job-2");
    expect(next?.status).toBe("Running");
  });

  it("3) next increments attempts when a job starts running", () => {
    const scheduler = createScheduler();

    scheduler.enqueue({
      id: "job-1",
      name: "A",
      priority: "High",
      maxRetries: 1,
    });

    const next = scheduler.next();

    expect(next?.attempts).toBe(1);
  });

  it("4) markCompleted moves a running job to completed", () => {
    const scheduler = createScheduler();

    scheduler.enqueue({
      id: "job-1",
      name: "A",
      priority: "High",
      maxRetries: 1,
    });

    scheduler.next();

    scheduler.markCompleted("job-1");

    expect(scheduler.get("job-1")?.status).toBe("Completed");
  });

  it("5) markFailed requeues job when retry policy allows it", () => {
    const scheduler = createScheduler();

    scheduler.enqueue({
      id: "job-1",
      name: "A",
      priority: "High",
      maxRetries: 2,
    });

    scheduler.next();

    scheduler.markFailed("job-1");

    const job = scheduler.get("job-1");
    expect(job?.status).toBe("Queued");
    expect(job?.attempts).toBe(1);
  });

  it("6) markFailed leaves job failed when retries are exhausted", () => {
    const scheduler = createScheduler();

    scheduler.enqueue({
      id: "job-1",
      name: "A",
      priority: "High",
      maxRetries: 1,
    });

    scheduler.next();
    scheduler.markFailed("job-1");

    scheduler.next();
    scheduler.markFailed("job-1");

    const job = scheduler.get("job-1");
    expect(job?.status).toBe("Failed");
    expect(job?.attempts).toBe(2);
  });
});
