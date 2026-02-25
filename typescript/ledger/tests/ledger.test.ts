import { describe, it, expect } from "vitest";
import { initialState, transition } from "../src/ledger/ledger.js";
import type { Command } from "../src/ledger/types.js";
import { availableMemory } from "node:process";

describe("Ledger kata", () => {
  it("1) starts with zero balance", () => {
    const s = initialState();
    expect(s.balance).toBe(0);
  });

  it("2) deposit increases balance and emits Deposited event", () => {
    const s0 = initialState();
    const cmd: Command = { type: "Deposit", amount: 100 };

    const { next, events } = transition(s0, cmd);

    expect(next.balance).toBe(100);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ type: "Deposited", amount: 100 });
  });

  it("3) withdraw decreases balance and emits Withdrawn event (when funds exist)", () => {
    const s0 = initialState();
    const { next: s1 } = transition(s0, { type: "Deposit", amount: 100 });

    const { next: s2, events } = transition(s1, {
      type: "Withdraw",
      amount: 40,
    });

    expect(s2.balance).toBe(60);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ type: "Withdrawn", amount: 40 });
  });

  it("4) withdraw with insufficient funds does NOT change balance and emits WithdrawalRejected", () => {
    const s0 = initialState();
    const { next, events } = transition(s0, { type: "Withdraw", amount: 10 });

    expect(next.balance).toBe(0);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ type: "WithdrawalRejected", amount: 10 });
  });

  it("5) invalid amounts (0 or negative) are rejected (no state change)", () => {
    const s0 = initialState();

    const cases: Command[] = [
      { type: "Deposit", amount: 0 },
      { type: "Deposit", amount: -1 },
      { type: "Withdraw", amount: 0 },
      { type: "Withdraw", amount: -5 },
    ];

    for (const cmd of cases) {
      const { next, events } = transition(s0, cmd);
      expect(next).toEqual(s0);
      // You decide if this is a specific event or an error outcome.
      // But be consistent: either emit a "Rejected" event or return an error structure.
      expect(events.length).toBe(1);
      expect(events[0]).toMatchObject({
        type: "InvalidAction",
        amount: events[0].amount,
      });
    }
  });

  it("6) statement/entries length equals number of accepted events", () => {
    const s0 = initialState();
    const { next: s1 } = transition(s0, { type: "Deposit", amount: 100 });
    const { next: s2 } = transition(s1, { type: "Withdraw", amount: 40 });
    const { next: s3 } = transition(s2, { type: "Withdraw", amount: 999 }); // rejected

    // Hint: store events or entries in state, or compute statement from them.
    // Either way, the "statement size" should reflect the event log.
    expect(s3.events.length).toBe(3);
    expect(s3.balance).toBe(60);
  });
});
