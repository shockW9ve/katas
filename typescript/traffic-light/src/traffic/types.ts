export type LightState = "Green" | "Yellow" | "Red" | "OFF";
export type Event = "TimerElapsed" | "Emergency";
export type LightEvent = { type: Event };
export type Action = "SetLight" | "PauseLight" | "TurnOffLights";
export type LightAction = { action: Action; to: LightState };
export type TransitionResult = {
  nextState: LightState;
  actions: LightAction[];
};
