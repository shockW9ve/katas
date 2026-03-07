import type {
  LightAction,
  LightEvent,
  LightState,
  TransitionResult,
} from "./types.js";
export function transition(
  state: LightState,
  event: LightEvent,
): TransitionResult {
  if (event.type === "Emergency") {
    let action: LightAction = { action: "PauseLight", to: "Red" };
    return { nextState: action.to, actions: [action] };
  }
  if (state === "Red") {
    let result: LightAction =
      state === "Red" && event.type === "TimerElapsed"
        ? { action: "SetLight", to: "Green" }
        : { action: "PauseLight", to: state };
    return { nextState: result.to, actions: [result] };
  } else if (state === "Yellow") {
    let result: LightAction =
      state === "Yellow" && event.type === "TimerElapsed"
        ? { action: "SetLight", to: "Red" }
        : { action: "PauseLight", to: state };
    return { nextState: result.to, actions: [result] };
  } else {
    let result: LightAction =
      state === "Green" && event.type === "TimerElapsed"
        ? { action: "SetLight", to: "Yellow" }
        : { action: "PauseLight", to: state };
    return { nextState: result.to, actions: [result] };
  }
}

export function initialState(): LightState {
  return "Red";
}
