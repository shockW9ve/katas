import type {
  ActionEvent,
  LightEvent,
  LightState,
  TransitionResult,
} from "./types.js";

const NEXT: Record<LightState, LightState> = {
  Red: "Green",
  Yellow: "Red",
  Green: "Yellow",
} as const;

export function transition(
  state: LightState,
  event: LightEvent,
): TransitionResult {
  if (event.type === "Emergency") {
    const action: ActionEvent = { action: "SetLight", to: "Red" };
    return { nextState: action.to, actions: [action] };
  }

  switch (state) {
    case "Red":
    case "Yellow":
    case "Green":
      return set(state);
    default:
      return assertUnreachable(state);
  }
}

export function initialState(): LightState {
  return "Red";
}

function set(state: LightState): TransitionResult {
  const to = NEXT[state];
  return {
    nextState: to,
    actions: [{ action: "SetLight", to }],
  };
}

function assertUnreachable(x: never): never {
  throw new Error(`Unhandled state: ${x}`);
}
