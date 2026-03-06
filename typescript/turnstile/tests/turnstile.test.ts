import { describe, expect, it } from "vitest";
import { transition } from "../src/turnstile/turnstile.js";
import type { TransitionResult } from "../src/turnstile/types.js";

describe("it each tests", () => {
  it.each([
    ["Locked", "Coin", "Unlocked", "ThankYou"],
    ["Locked", "Push", "Locked", "Alarm"],
    ["Unlocked", "Coin", "Unlocked", "ReturnCoin"],
    ["Unlocked", "Push", "Locked", "OpenGate"],
  ] as const)(
    "state:%s - event:%s - expectedState:%s - expectedAction:%s",
    (state, event, expectedState, expectedAction) => {
      let result: TransitionResult = transition(state, event);
      expect(result.nextState).toBe(expectedState);
      expect(result.actions).toHaveLength(1);
      expect(result.actions[0]).toBe(expectedAction);
    },
  );
});
