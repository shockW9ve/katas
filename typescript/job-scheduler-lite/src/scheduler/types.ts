export type Priority = "Low" | "Medium" | "High";
export type JobStatus = "Queued" | "Running" | "Completed" | "Failed";
export type JobId = string;

export interface NewJob {
  jobId: JobId;
  name: string;
  priority: Priority;
  maxRetries: number;
}

export interface ScheduledJob {
  jobId: JobId;
  name: string;
  priority: Priority;
  status: JobStatus;
  attempts: number;
  maxRetries: number;
}

export type SchedulerResult = ScheduledJob;

export interface RetryPolicy {
  shouldRetry(job: ScheduledJob): boolean;
}

export interface SchedulerBlueprint {
  enqueue(job: NewJob): SchedulerResult;
  next(): SchedulerResult | undefined;
  markCompleted(jobId: JobId): void;
  markFailed(jobId: JobId): void;
  get(jobId: JobId): SchedulerResult;
  all(): ReadonlyMap<JobId, ScheduledJob>;
}
