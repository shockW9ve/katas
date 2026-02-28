import {
  Action,
  ActionTaken,
  Command,
  Currency,
  CurrencyCode,
  CurrencySymbol,
  Event,
  LedgerState,
} from "./types.js";

export function initialState(): LedgerState {
  return {
    balance: 0,
    currency: {
      code: "USD",
      symbol: "$",
    },
    events: [],
  };
}

export function transition(
  state: LedgerState,
  command: Command,
): { next: LedgerState } {
  if (command.amount <= 0) {
    return {
      next: {
        balance: state.balance,
        currency: { code: "USD", symbol: "$" },
        events: [
          ...state.events,
          { type: "InvalidAction", amount: command.amount },
        ],
      },
    };
  }

  let calc = balance(state.balance, command);
  let cur = currencySymbol(state.currency.code);

  if (command.type === "DepositRequest") {
    return {
      next: {
        balance: calc,
        currency: cur,
        events: [
          ...state.events,
          { type: "Deposited", amount: command.amount },
        ],
      },
    };
  } else if (command.type === "WithdrawRequest") {
    let funds = isValid(state.balance, command.amount);
    if (funds) {
      return {
        next: {
          balance: calc,
          currency: cur,
          events: [
            ...state.events,
            { type: "Withdrawn", amount: command.amount },
          ],
        },
      };
    } else {
      return {
        next: {
          balance: state.balance,
          currency: cur,
          events: [
            ...state.events,
            { type: "WithdrawalRejected", amount: command.amount },
          ],
        },
      };
    }
  }

  return {
    next: {
      balance: 0,
      currency: { code: "", symbol: "" },
      events: [],
    },
  };
}

function balance(balance: number, command: Command): number {
  if (command.type === "DepositRequest") {
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

function currencySymbol(code: CurrencyCode): Currency {
  // const symbols = new Map<CurrencyCode, CurrencySymbol>([
  //   ["USD", "$"],
  //   ["EUR", "€"],
  //   ["GBP", "£"],
  // ]);
  const currencySymbols: Record<string, CurrencySymbol> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  return { code: code, symbol: currencySymbols[code] };
}
// function currencySymbol(currency: CurrencyCode): Intl.NumberFormat {
//   return new Intl.NumberFormat("default", {
//     style: "currency",
//     currency: currency,
//   });
// }
