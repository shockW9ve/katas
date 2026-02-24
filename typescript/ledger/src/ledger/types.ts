export type Command = {
  type: Event;
  amount: number;
};
export type Event = "Deposit" | "Withdraw";
export type Action =
  | "Deposited"
  | "Withdrawn"
  | "WithdrawalRejected"
  | "InvalidAction";
export type ActionTaken = { type: Action; amount: number };
export type LedgerState = Readonly<{
  balance: number;
  events: Array<Event>;
}>;
export type Money = "USD" | "EUR" | "GBP";
