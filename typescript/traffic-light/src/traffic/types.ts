export type LightState = "Green" | "Yellow" | "Red";
export type Event = "TimerElapsed" | "Emergency";
export type LightEvent = { type: Event };
export type Action = "SetLight";
export type ActionEvent = { action: Action; to: LightState };
export type TransitionResult = {
  nextState: LightState;
  actions: ActionEvent[];
};
