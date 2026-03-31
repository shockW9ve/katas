import { Clock, FakeClock } from "./clock.js";
import type { Policy } from "./policies.js";

export type CacheRequest = {
  capacity: number;
  clock: Clock;
  policy: Policy;
};
