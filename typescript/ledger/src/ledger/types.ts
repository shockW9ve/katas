export type Command = {
  type: string;
  amount: number;
};
export type Event = "Desposit" | "Withdraw" | "WithdrawalRejected";
export type LedgerState = {
  balance: number;
  events: [];
};
export type Money = "USD" | "EUR" | "GBP";
