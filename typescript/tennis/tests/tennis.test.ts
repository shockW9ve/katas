import { describe, it, expect } from "vitest";
import Game, {
  Points,
  applyPoint,
  addPoint,
  Games,
  applyGame,
  Sets,
  applySet,
  phaseFor,
  calculateOutcome,
  Player,
} from "../src/Game/TennisGame.js";

describe("No mutation tests", () => {
  it("New point object", () => {
    const p = Object.freeze({ a: 0, b: 0 }) as Points;
    const next = applyPoint(p, "A");
    expect(next).toStrictEqual({ a: 1, b: 0 });
  });

  it("New game object", () => {
    const p = Object.freeze({ a: 0, b: 0 }) as Games;
    const next = applyGame(p, "A");
    expect(next).toStrictEqual({ a: 1, b: 0 });
  });

  it("New set object", () => {
    const p = Object.freeze({ a: 0, b: 0 }) as Sets;
    const next = applySet(p, "A");
    expect(next).toStrictEqual({ a: 1, b: 0 });
  });

  describe("Phase tests", () => {
    it("Normal phase", () => {
      const game = new Game();
      game.point("A");
      const phase = phaseFor(game.snapshot());
      expect(phase.kind).toBe("Normal");
    });

    it("Deuce phase", () => {
      const game = new Game();
      game.point("A");
      game.point("A");
      game.point("A");
      game.point("B");
      game.point("B");
      game.point("B");
      const phase = phaseFor(game.snapshot());
      expect(phase.kind).toBe("Deuce");
    });

    it("AdvantageA phase", () => {
      const game = new Game();
      game.point("A");
      game.point("A");
      game.point("A");
      game.point("B");
      game.point("B");
      game.point("B");
      game.point("A");
      const phase = phaseFor(game.snapshot());
      expect(phase.kind).toBe("Advantage");
      expect(phase.who).toBe("A");
    });

    it("AdvantageB phase", () => {
      const game = new Game();
      game.point("A");
      game.point("A");
      game.point("A");
      game.point("B");
      game.point("B");
      game.point("B");
      game.point("B");
      const phase = phaseFor(game.snapshot());
      expect(phase.kind).toBe("Advantage");
      expect(phase.who).toBe("B");
    });

    it("GameA phase", () => {
      const game = new Game();
      game.point("A");
      game.point("A");
      game.point("A");
      game.point("B");
      game.point("B");

      const state = game.snapshot();
      const nextPoints: Points = applyPoint(state.points, "A");
      const phase = calculateOutcome(
        nextPoints,
        state.games,
        state.sets,
        "A",
        state.tiebreaker,
      );
      expect(phase).toStrictEqual({ kind: "GameWon", by: "A" });
    });
  });

  it("GameB phase", () => {
    const game = new Game();
    game.point("A");
    game.point("B");
    game.point("A");
    game.point("B");
    game.point("B");

    const state = game.snapshot();
    const nextPoints: Points = applyPoint(state.points, "B");
    const phase = calculateOutcome(
      nextPoints,
      state.games,
      state.sets,
      "B",
      state.tiebreaker,
    );
    expect(phase).toStrictEqual({ kind: "GameWon", by: "B" });
  });

  // TODO
  // Tiebreaker
  it("Tiebreaker phase", () => {
    // arrange
    // act
    // assert
    // const game = new Game();
    // game.point("A");
    // game.point("B");
    // game.point("A");
    // game.point("B");
    // game.point("B");
    //
    // const state = game.snapshot();
    // const nextPoints: Points = applyPoint(state.points, "B");
    // const phase = calculateOutcome(
    //   nextPoints,
    //   state.games,
    //   state.sets,
    //   "B",
    //   state.tiebreaker,
    // );
    // expect(phase).toStrictEqual({ kind: "GameWon", by: "B" });
  });
  // Sets
});

it.each([
  [
    {
      matchState: {
        points: { a: 0, b: 0 },
        games: { a: 0, b: 0 },
        sets: { a: 0, b: 0 },
        tiebreaker: false,
      },
    },
    { player: "A" },
    {
      expected: {
        points: { a: 1, b: 0 },
        games: { a: 0, b: 0 },
        sets: { a: 0, b: 0 },
        tiebreaker: false,
      },
    },
    { outcome: { kind: "None" } },
  ],
  [
    {
      matchState: {
        points: { a: 0, b: 0 },
        games: { a: 0, b: 0 },
        sets: { a: 0, b: 0 },
        tiebreaker: false,
      },
    },
    { player: "B" },
    {
      expected: {
        points: { a: 0, b: 1 },
        games: { a: 0, b: 0 },
        sets: { a: 0, b: 0 },
        tiebreaker: false,
      },
    },
    { outcome: { kind: "None" } },
  ],
])("%s %s %s", (matchState, player, expectedState, expectedOutcome) => {
  // arrange
  // act
  const state = addPoint(matchState.matchState, player.player);
  // assert
  expect(state.next).toStrictEqual(expectedState.expected);
  expect(state.outcome).toStrictEqual(expectedOutcome.outcome);
});
