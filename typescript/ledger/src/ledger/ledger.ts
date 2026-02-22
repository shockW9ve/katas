import { Command, Event, LedgerState } from "./types.js";
export function initialState(): LedgerState {
  return {
    balance: 0,
    events: [],
  };
}
export function transition(
  state: LedgerState,
  command: Command,
): { next; events } {
  if (command.type === "Desposit") {
    return {
      next: { balance: state.balance + command.amount },
      events: command.type,
    };
  }
  return { next: "", events: [] };
}
export function apply(state, event) {}

function evaluateEvent(event: Event): LedgerState {
  if (event === "Desposit") {
    return {};
  }
}
