import { Action, ActionTaken, Command, Event, LedgerState } from "./types.js";
export function initialState(): LedgerState {
  return {
    balance: 0,
    events: [],
  };
}
export function transition(
  state: LedgerState,
  command: Command,
): { next: LedgerState; events: Array<ActionTaken> } {
  if (command.amount <= 0) {
    return {
      next: { balance: 0, events: [] },
      events: [{ type: "InvalidAction", amount: command.amount }],
    };
  }

  let nextEvent = [...state.events, command.type];
  let calc = balance(state.balance, command);

  if (command.type === "DepositRequest") {
    return {
      next: { balance: calc, events: state.events },
      events: [{ type: "Deposited", amount: command.amount }],
    };
  } else if (command.type === "WithdrawRequest") {
    let funds = isValid(state.balance, command.amount);
    if (funds) {
      return {
        next: {
          balance: calc,
          events: state.events,
        },
        events: [{ type: "Withdrawn", amount: command.amount }],
      };
    } else {
      return {
        next: {
          balance: state.balance,
          events: state.events,
        },
        events: [{ type: "WithdrawalRejected", amount: command.amount }],
      };
    }
  }
  return { next: { balance: 0, events: [] }, events: [] };
}

function balance(balance: number, command: Command): number {
  if (command.type === "Deposit") {
    return balance + command.amount;
  } else {
    return balance - command.amount;
  }
}

function isValid(balance: number, amount: number) {
  if (balance - amount < 0) {
    return false;
  } else {
    return true;
  }
}
