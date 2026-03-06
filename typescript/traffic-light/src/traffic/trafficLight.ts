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
  return { nextState: "OFF", action: [] };
}

export function initialState(): LightState {
  return "Red";
}
