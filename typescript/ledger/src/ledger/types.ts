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
  currency: Currency;
  events: Array<ActionTaken>;
}>;

export type Currency = "USD" | "EUR" | "GBP";
