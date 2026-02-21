export type Command = {
  type: string;
  amount: number;
};
export type Event = "Desposit" | "Withdraw" | "WithdrawalRejected";
export type LedgerState = {};
export type Money = "USD" | "EUR" | "GBP";
