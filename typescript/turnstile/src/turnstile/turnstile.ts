import { Actions, Event, State } from "./types.js";

function transition(
  state: State,
  event: Event,
): { nextState: State; actions: Actions[] } {
  if (state === "Locked") {
    if (event === "Coin") {
      return { nextState: "Unlocked", actions: ["ThankYou"] };
    } else {
      return { nextState: "Locked", actions: ["Alarm"] };
    }
  } else {
    if (event === "Coin") {
      return { nextState: "Unlocked", actions: ["ReturnCoin"] };
    } else {
      return { nextState: "Locked", actions: ["OpenGate"] };
    }
  }
}
