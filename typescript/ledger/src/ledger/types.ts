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
  currency: CurrencyCode;
  events: Array<ActionTaken>;
}>;

export type CurrencyCode = "USD" | "EUR" | "GBP" | "";
