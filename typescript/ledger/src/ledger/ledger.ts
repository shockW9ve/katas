import { Command, Event, LedgerState } from "./types.js";
export function initialState(): LedgerState {
  return {
    balance: 0,
    // events: [],
  };
}
export function transition(
  state: LedgerState,
  command: Command,
  // ): { next: LedgerState; events: Array<Event> } {
): { next: LedgerState; events: Array<Command> } {
  if (command.type === "Deposit") {
    return {
      next: { balance: state.balance + command.amount },
      events: [command],
    };
  }
  return { next: { balance: 0, events: [command.type] } };
}
// export function apply(state, event) {}
//
// function evaluateEvent(event: Event): LedgerState {
//   if (event === "Desposit") {
//     return {};
//   }
// }

class Ledger {
  private _state: LedgerState;

  constructor() {
    this._state = initialState();
  }
}
