import type { Actions, Event, State } from "./types.js";

export function transition(
  state: State,
  event: Event,
): { nextState: State; actions: Actions[] } {
  if (state === "Locked") {
    let status: { nextState: State; actions: Actions[] } =
      event === "Coin"
        ? { nextState: "Unlocked", actions: ["ThankYou"] }
        : { nextState: "Locked", actions: ["Alarm"] };
    return status;
    // if (event === "Coin") {
    //   return { nextState: "Unlocked", actions: ["ThankYou"] };
    // } else {
    //   return { nextState: "Locked", actions: ["Alarm"] };
    // }
  } else {
    if (event === "Coin") {
      return { nextState: "Unlocked", actions: ["ReturnCoin"] };
    } else {
      return { nextState: "Locked", actions: ["OpenGate"] };
    }
  }
}
