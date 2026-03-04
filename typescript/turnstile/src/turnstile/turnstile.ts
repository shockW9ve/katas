import type { Actions, Event, State, TransitionResult } from "./types.js";

export function transition(state: State, event: Event): TransitionResult {
  if (state === "Locked") {
    const status: { nextState: State; actions: Actions[] } =
      event === "Coin"
        ? { nextState: "Unlocked", actions: ["ThankYou"] }
        : { nextState: "Locked", actions: ["Alarm"] };
    return status;
  } else {
    const status: { nextState: State; actions: Actions[] } =
      event === "Coin"
        ? { nextState: "Unlocked", actions: ["ReturnCoin"] }
        : { nextState: "Locked", actions: ["OpenGate"] };
    return status;
  }
}
