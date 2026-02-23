export type Command = {
  type: Event;
  amount: number;
};
export type Event = "Deposit" | "Withdraw" | "WithdrawalRejected";
export type LedgerState = Readonly<{
  balance: number;
  // events: Array<Event>;
}>;
export type Money = "USD" | "EUR" | "GBP";
