export type Command = {
  type: Event;
  amount: number;
};

export type Event = "DepositRequest" | "WithdrawRequest";

export type Action =
  | "Deposited"
  | "Withdrawn"
  | "WithdrawalRejected"
  | "InvalidAction";
export type ActionTaken = { type: Action; amount: number };

export type LedgerState = Readonly<{
  balance: number;
  currency: {
    code: CurrencyCode;
    symbol: CurrencySymbol;
  };
  events: ReadonlyArray<ActionTaken>;
  // events: ReadonlyArray<Action>;
}>;

export type CurrencyCode = "USD" | "EUR" | "GBP" | "";
export type CurrencySymbol = "$" | "€" | "£" | "";
export type Currency = { code: CurrencyCode; symbol: CurrencySymbol };
