export type Priority = "Low" | "Medium" | "High";

export type JobStatus =
  | "Queued"
  | "Running"
  | "Completed"
  | "Failed"
  | "Poisoned";

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

export interface Job {
  jobId: JobId;
  name: string;
  priority: Priority;
  status?: JobStatus;
  attempts?: number;
  maxRetries: number;
}

export interface SchedulerResult {
  jobId: JobId;
  name: string;
  priority: Priority;
  status: JobStatus;
  attempts: number;
  maxRetries: number;
}

export interface QueuePolicy {
  onQueued(): void;
  onRunning(): void;
  onComplete(): void;
  onFail(): void;
}

export interface SchedulerBlueprint {
  enqueue(job: Job): SchedulerResult;
  next(): SchedulerResult | undefined;
  markCompleted(jobId: JobId): void;
  markFailed(jobId: JobId): void;
  get(jobId: JobId): SchedulerResult;
  all(): Map<JobId, Job>;
}
