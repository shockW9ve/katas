import { describe, expect, it } from "vitest";
import { transition } from "../src/turnstile/turnstile.js";

describe("it each tests", () => {
  it.each([["Locked", "Coin", "Unlocked", "ThankYou"]] as const)(
    "%s%s%s%s",
    (state, event, expectedState, expectedAction) => {
      let result = transition(state, event);
      expect(result.nextState).toBe(expectedState);
      expect(result.actions[0]).toMatchObject(expectedAction);
    },
  );
});
