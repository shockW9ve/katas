import type { SchedulerBlueprint } from "./types.js";

class Scheduler implements SchedulerBlueprint {
  enqueue(jobInput) {}
  next() {}
  markCompleted() {}
  markFailed() {}
  get(jobid) {}
  all();
}

export function createScheduler() {
  return new Scheduler();
}
