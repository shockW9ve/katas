export type State = "Locked" | "Unlocked";
export type Event = "Coin" | "Push";
export type Actions = "ThankYou" | "Alarm" | "ReturnCoin" | "OpenGate";
export type TransitionResult = { nextState: State; actions: Actions[] };
