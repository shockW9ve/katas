type Priority = "Low" | "Medium" | "High";
type JobStatus = "Queued" | "Running" | "Completed" | "Failed";

interface JobId {
  id: string;
}

interface Job {
  id: JobId;
  name: string;
  priority: Priority;
  status: JobStatus;
  attemps: number;
  maxAttemps: number;
}

interface SchedulerResult {}

export interface QueuePolicy {
  onQueued(): void;
  onRunning(): void;
  onComplete(): void;
  onFail(): void;
}

export interface SchedulerBlueprint {
  enqueue(jobInput);
  next();
  markCompleted();
  markFailed();
  get(jobid);
  all();
}
