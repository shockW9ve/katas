import { Clock, FakeClock } from "./clock.js";
import { Policy } from "./policies.js";

export type CacheRequest = {
  capacity: number;
  clock: FakeClock; //Clock;
  policy: Policy;
};
