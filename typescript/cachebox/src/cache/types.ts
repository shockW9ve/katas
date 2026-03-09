import { Clock } from "./clock.js";
import { Policy } from "./policies.js";

export type cacheRequest = {
  capacity: number;
  clock: Clock;
  policy: Policy;
};
