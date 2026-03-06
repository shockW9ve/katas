export type LightState = "Green" | "Yellow" | "Red" | "OFF";
export type LightEvent = "TimerElapsed" | "Emergency";
export type Action = "SetLight" | "TurnOffLights";
export type LightAction = { action: Action; to: LightState };
export type TransitionResult = { nextState: LightState; action: Action[] };
