export type Priority = "Low" | "Medium" | "High";
export type JobStatus = "Queued" | "Running" | "Completed" | "Failed";

export interface JobId {
  id: string;
}

export interface Job {
  // id: JobId;
  id: string;
  name: string;
  priority: Priority;
  status?: JobStatus;
  attempts?: number;
  maxRetries: number;
}

export interface SchedulerResult {}

export interface QueuePolicy {
  onQueued(): void;
  onRunning(): void;
  onComplete(): void;
  onFail(): void;
}

export interface SchedulerBlueprint {
  enqueue(job: Job): void;
  next(): Job | null;
  markCompleted(jobId: JobId): void;
  markFailed(jobId: JobId): void;
  get(jobId: JobId): Job | null;
  all(): Job[];
}
