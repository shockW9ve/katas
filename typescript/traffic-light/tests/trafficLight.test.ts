import { describe, it, expect } from "vitest";
import { initialState, transition } from "../src/traffic/trafficLight.js";
import type { LightState, LightEvent } from "../src/traffic/types.js";

describe("Traffic light", () => {
  it("1) starts at Red", () => {
    expect(initialState()).toBe("Red");
  });

  it("2) Red + TimerElapsed -> Green", () => {
    const s = transition("Red", { type: "TimerElapsed" });
    expect(s.nextState).toBe("Green");
    expect(s.actions).toHaveLength(1);
  });

  it("3) Green + TimerElapsed -> Yellow", () => {
    const s = transition("Green", { type: "TimerElapsed" });
    expect(s.nextState).toBe("Yellow");
    expect(s.actions).toHaveLength(1);
  });

  it("4) Yellow + TimerElapsed -> Red", () => {
    const s = transition("Yellow", { type: "TimerElapsed" });
    expect(s.nextState).toBe("Red");
    expect(s.actions).toHaveLength(1);
  });

  it("5) action always matches the next state", () => {
    const s = transition("Red", { type: "TimerElapsed" });
    // Hint: your action should encode which light is being set.
    expect(JSON.stringify(s.actions[0])).toContain(s.nextState);
  });

  it("6) Emergency forces Red from any state", () => {
    const s = transition("Green", { type: "Emergency" });
    expect(s.nextState).toBe("Red");
    expect(s.actions).toHaveLength(1);
  });
});
