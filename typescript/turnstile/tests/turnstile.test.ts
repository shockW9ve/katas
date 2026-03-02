import { describe, expect, it } from "vitest";

describe("it each tests", () => {
  it.each([[]] as const)("", (state, event, expectedState, expectedAction) => {
    expect();
  });
});
