import { describe, it, expect } from "vitest";
import { initialState, transition } from "../src/ledger/ledger.js";
import type { Command } from "../src/ledger/types.js";

describe("Ledger kata", () => {
  it("1) starts with zero balance", () => {
    const s = initialState();
    expect(s.balance).toBe(0);
  });

  it("2) deposit increases balance and emits Deposited event", () => {
    const s0 = initialState();
    const cmd: Command = { type: "DepositRequest", amount: 100 };

    const { next } = transition(s0, cmd);

    expect(next.balance).toBe(100);
    expect(next.events).toHaveLength(1);
    expect(next.events[0]).toMatchObject({ type: "Deposited", amount: 100 });
  });

  it("3) withdraw decreases balance and emits Withdrawn event (when funds exist)", () => {
    const s0 = initialState();
    const { next: s1 } = transition(s0, {
      type: "DepositRequest",
      amount: 100,
    });

    const { next: s2 } = transition(s1, {
      type: "WithdrawRequest",
      amount: 40,
    });

    expect(s2.balance).toBe(60);
    expect(s2.events).toHaveLength(2);
    expect(s2.events.at(-1)).toMatchObject({ type: "Withdrawn", amount: 40 });
  });

  it("4) withdraw with insufficient funds does NOT change balance and emits WithdrawalRejected", () => {
    const s0 = initialState();
    const { next } = transition(s0, { type: "WithdrawRequest", amount: 10 });

    expect(next.balance).toBe(0);
    expect(next.events).toHaveLength(1);
    expect(next.events[0]).toMatchObject({
      type: "WithdrawalRejected",
      amount: 10,
    });
  });

  it("5) invalid amounts (0 or negative) are rejected (no state change)", () => {
    const s0 = initialState();

    const cases: Command[] = [
      { type: "DepositRequest", amount: 0 },
      { type: "DepositRequest", amount: -1 },
      { type: "WithdrawRequest", amount: 0 },
      { type: "WithdrawRequest", amount: -5 },
    ];

    for (const cmd of cases) {
      const { next } = transition(s0, cmd);
      expect(next.events.length).toBe(1);
      expect(next.events[0]).toMatchObject({
        type: "InvalidAction",
        amount: cmd.amount,
      });
    }
  });

  it("6) statement/entries length equals number of accepted events", () => {
    const s0 = initialState();
    const { next: s1 } = transition(s0, {
      type: "DepositRequest",
      amount: 100,
    });
    const { next: s2 } = transition(s1, {
      type: "WithdrawRequest",
      amount: 40,
    });
    const { next: s3 } = transition(s2, {
      type: "WithdrawRequest",
      amount: 999,
    }); // rejected

    expect(s3.events.length).toBe(3);
    expect(s3.balance).toBe(60);
  });

  it("invalid command appends exactly one event to an existing event log", () => {
    const s0 = initialState();

    // create a state with 1 event
    const { next: s1 } = transition(s0, {
      type: "DepositRequest",
      amount: 100,
    });
    expect(s1.events).toHaveLength(1);

    // run an invalid command against that existing state
    const { next: s2 } = transition(s1, { type: "WithdrawRequest", amount: 0 });

    expect(s2.events).toHaveLength(2); // +1 event appended
    expect(s2.events.at(-1)).toMatchObject({
      type: "InvalidAction",
      amount: 0,
    });
    expect(s2.balance).toBe(100); // balance unchanged
  });

  it("transition does not mutate the input state (immutability)", () => {
    const s0 = initialState();

    // freeze top-level and the events array (important)
    Object.freeze(s0);
    Object.freeze(s0.events);

    const { next } = transition(s0, { type: "DepositRequest", amount: 100 });

    // If transition mutated s0.events, the call would throw before reaching here.
    // Also assert input still looks like initial.
    expect(s0.balance).toBe(0);
    expect(s0.events).toHaveLength(0);

    // sanity: next differs
    expect(next.balance).toBe(100);
    expect(next.events).toHaveLength(1);
  });
});

describe("invalid amounts", () => {
  it.each([
    ["DepositRequest", 0],
    ["DepositRequest", -1],
    ["WithdrawRequest", 0],
    ["WithdrawRequest", -5],
  ] as const)("%s with amount=%i => InvalidAction", (type, amount) => {
    const s0 = initialState();
    const { next } = transition(s0, { type, amount });

    expect(next.balance).toBe(s0.balance);
    expect(next.events).toHaveLength(1);
    expect(next.events[0]).toMatchObject({ type: "InvalidAction", amount });
  });
});
