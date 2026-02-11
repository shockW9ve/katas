import { describe, it, expect } from "vitest";
import Game, {
  Points,
  applyPoint,
  addPoint,
  Games,
  applyGame,
  Sets,
  applySet,
  Phase,
  PhaseKind,
  phaseFor,
  formatScore,
  calculateOutcome,
  Player,
} from "../src/Game/TennisGame.js";

describe("No mutation tests", () => {
  // objects
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
});

// phases
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

  it("Tiebreaker phase", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 2 },
      games: { a: 5, b: 6 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    game.point("A");
    const phase = phaseFor(game.snapshot());
    // assert
    expect(phase.kind).toBe("Tiebreaker");
  });
});

// outcomes
describe("Outcome tests", () => {
  // todo none

  it("None outcome", () => {
    const game = new Game();

    const state = game.snapshot();
    const nextPoints: Points = applyPoint(state.points, "A");
    const phase = calculateOutcome(
      nextPoints,
      state.games,
      state.sets,
      "A",
      state.tiebreaker,
    );
    expect(phase).toStrictEqual({ kind: "None" });
  });

  it("Tiebreaker flag gives SetWon outcome", () => {
    const matchState = {
      points: { a: 6, b: 4 },
      games: { a: 6, b: 6 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    const state = game.snapshot();
    const nextPoints: Points = applyPoint(state.points, "A");
    const phase = calculateOutcome(
      nextPoints,
      state.games,
      state.sets,
      "A",
      true,
    );
    expect(phase).toStrictEqual({ kind: "SetWon", by: "A" });
  });

  it("GameA outcome", () => {
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

  it("GameB outcome", () => {
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

  it("GameWon by B outcome", () => {
    // arrange
    const matchState = {
      points: { a: 2, b: 3 },
      games: { a: 4, b: 5 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const nextPoints = applyPoint(state.points, "B");
    const outcome = calculateOutcome(
      nextPoints,
      state.games,
      state.sets,
      "B",
      state.tiebreaker,
    );
    // assert
    expect(state).toStrictEqual({
      points: { a: 2, b: 3 },
      games: { a: 4, b: 5 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    });
    expect(nextPoints).toStrictEqual({ a: 2, b: 4 });
    expect(outcome).toStrictEqual({ kind: "GameWon", by: "B" });
  });

  it("GameWon by A outcome", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 2 },
      games: { a: 5, b: 4 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const nextPoints = applyPoint(state.points, "A");
    const outcome = calculateOutcome(
      nextPoints,
      state.games,
      state.sets,
      "A",
      state.tiebreaker,
    );
    // assert
    expect(state).toStrictEqual({
      points: { a: 3, b: 2 },
      games: { a: 5, b: 4 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    });
    expect(nextPoints).toStrictEqual({ a: 4, b: 2 });
    expect(outcome).toStrictEqual({ kind: "GameWon", by: "A" });
  });

  it("SetWon by A outcome", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 2 },
      games: { a: 5, b: 4 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const result = addPoint(state, "A");
    // assert
    expect(state).toStrictEqual({
      points: { a: 3, b: 2 },
      games: { a: 5, b: 4 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    });
    expect(result.next).toStrictEqual({
      points: { a: 0, b: 0 },
      games: { a: 0, b: 0 },
      sets: { a: 1, b: 0 },
      tiebreaker: false,
    });
    expect(result.outcome).toStrictEqual({ kind: "SetWon", by: "A" });
  });

  it("SetWon by B outcome", () => {
    // arrange
    const matchState = {
      points: { a: 2, b: 3 },
      games: { a: 4, b: 5 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const result = addPoint(state, "B");
    // assert
    expect(state).toStrictEqual({
      points: { a: 2, b: 3 },
      games: { a: 4, b: 5 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    });
    expect(result.next).toStrictEqual({
      points: { a: 0, b: 0 },
      games: { a: 0, b: 0 },
      sets: { a: 0, b: 1 },
      tiebreaker: false,
    });
    expect(result.outcome).toStrictEqual({ kind: "SetWon", by: "B" });
  });

  it("Entered tiebreaker outcome", () => {
    // arrange
    const matchState = {
      points: { a: 2, b: 3 },
      games: { a: 6, b: 5 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const result = addPoint(state, "B");
    // assert

    expect(result.next).toStrictEqual({
      points: { a: 0, b: 0 },
      games: { a: 6, b: 6 },
      sets: { a: 0, b: 0 },
      tiebreaker: true,
    });
    expect(result.outcome).toStrictEqual({ kind: "EnteredTiebreaker" });
  });

  it("In tiebreaker outcome", () => {
    // arrange
    const matchState = {
      points: { a: 2, b: 3 },
      games: { a: 6, b: 6 },
      sets: { a: 0, b: 0 },
      tiebreaker: true,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const result = addPoint(state, "B");
    // assert
    expect(result.next).toStrictEqual({
      points: { a: 2, b: 4 },
      games: { a: 6, b: 6 },
      sets: { a: 0, b: 0 },
      tiebreaker: true,
    });
    expect(result.outcome).toStrictEqual({ kind: "None" });
  });

  it("Win match outcome", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 2 },
      games: { a: 5, b: 3 },
      sets: { a: 2, b: 1 },
      tiebreaker: false,
    };
    const game = new Game(matchState);
    // act
    const state = game.snapshot();
    const result = addPoint(state, "A");
    // assert
    expect(result.next).toStrictEqual({
      points: { a: 3, b: 2 },
      games: { a: 6, b: 3 },
      sets: { a: 3, b: 1 },
      tiebreaker: false,
    });
    expect(result.outcome).toStrictEqual({ kind: "MatchWon", by: "A" });
  });
});

// phaseFor
describe("Score tests", () => {
  it("Normal phase", () => {
    // arrange
    const matchState = {
      points: { a: 2, b: 1 },
      games: { a: 3, b: 3 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    // act
    const phase = phaseFor(matchState);
    // assert
    expect(phase).toStrictEqual({ kind: "Normal" });
  });

  it("Deuce phase", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 3 },
      games: { a: 3, b: 3 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    // act
    const phase = phaseFor(matchState);
    // assert
    expect(phase).toStrictEqual({ kind: "Deuce" });
  });

  it("Advantage A phase", () => {
    // arrange
    const matchState = {
      points: { a: 4, b: 3 },
      games: { a: 3, b: 3 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    // act
    const phase = phaseFor(matchState);
    // assert
    expect(phase).toStrictEqual({ kind: "Advantage", who: "A" });
  });

  it("Advantage B phase", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 4 },
      games: { a: 3, b: 3 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    // act
    const phase = phaseFor(matchState);
    // assert
    expect(phase).toStrictEqual({ kind: "Advantage", who: "B" });
  });

  it("Tiebreaker phase", () => {
    // arrange
    const matchState = {
      points: { a: 0, b: 0 },
      games: { a: 6, b: 6 },
      sets: { a: 0, b: 0 },
      tiebreaker: true,
    };
    // act
    const phase = phaseFor(matchState);
    // assert
    expect(phase).toStrictEqual({ kind: "Tiebreaker" });
  });
});

// score
describe("Formatted score tests", () => {
  it("Normal 15 score", () => {
    // arrange
    const matchState = {
      points: { a: 1, b: 0 },
      games: { a: 1, b: 1 },
      sets: { a: 1, b: 1 },
      tiebreaker: true,
    };
    const phaseKind: PhaseKind = "Normal";
    const phase: Phase = { kind: phaseKind };
    // act
    const score = formatScore(matchState, phase);
    // assert
    expect(score).toStrictEqual({
      pointsA: "15",
      pointsB: "0",
      games: { a: 1, b: 1 },
      sets: { a: 1, b: 1 },
      phase: { kind: "Normal" },
    });
  });

  it("Normal 30 score", () => {
    // arrange
    const matchState = {
      points: { a: 1, b: 2 },
      games: { a: 1, b: 1 },
      sets: { a: 1, b: 1 },
      tiebreaker: true,
    };
    const phaseKind: PhaseKind = "Normal";
    const phase: Phase = { kind: phaseKind };
    // act
    const score = formatScore(matchState, phase);
    // assert
    expect(score).toStrictEqual({
      pointsA: "15",
      pointsB: "30",
      games: { a: 1, b: 1 },
      sets: { a: 1, b: 1 },
      phase: { kind: "Normal" },
    });
  });

  it("Normal 40 score", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 2 },
      games: { a: 1, b: 1 },
      sets: { a: 1, b: 1 },
      tiebreaker: true,
    };
    const phaseKind: PhaseKind = "Normal";
    const phase: Phase = { kind: phaseKind };
    // act
    const score = formatScore(matchState, phase);
    // assert
    expect(score).toStrictEqual({
      pointsA: "40",
      pointsB: "30",
      games: { a: 1, b: 1 },
      sets: { a: 1, b: 1 },
      phase: { kind: "Normal" },
    });
  });

  it("Deuce score", () => {
    // arrange
    const matchState = {
      points: { a: 3, b: 3 },
      games: { a: 3, b: 3 },
      sets: { a: 1, b: 1 },
      tiebreaker: true,
    };
    const phaseKind: PhaseKind = "Deuce";
    const phase: Phase = { kind: phaseKind };
    // act
    const score = formatScore(matchState, phase);
    // assert
    expect(score).toStrictEqual({
      pointsA: "40",
      pointsB: "40",
      games: { a: 3, b: 3 },
      sets: { a: 1, b: 1 },
      phase: { kind: "Deuce" },
    });
  });

  it("Advantage score", () => {
    // arrange
    const matchState = {
      points: { a: 5, b: 5 },
      games: { a: 6, b: 6 },
      sets: { a: 1, b: 1 },
      tiebreaker: true,
    };
    const phaseKind: PhaseKind = "Tiebreaker";
    const phase: Phase = { kind: phaseKind };
    // act
    const score = formatScore(matchState, phase);
    // assert
    expect(score).toStrictEqual({
      pointsA: "5",
      pointsB: "5",
      games: { a: 6, b: 6 },
      sets: { a: 1, b: 1 },
      phase: { kind: "Tiebreaker" },
    });
  });

  it("Tiebreaker score", () => {
    // arrange
    const matchState = {
      points: { a: 5, b: 5 },
      games: { a: 6, b: 6 },
      sets: { a: 1, b: 1 },
      tiebreaker: true,
    };
    const phaseKind: PhaseKind = "Tiebreaker";
    const phase: Phase = { kind: phaseKind };
    // act
    const score = formatScore(matchState, phase);
    // assert
    expect(score).toStrictEqual({
      pointsA: "5",
      pointsB: "5",
      games: { a: 6, b: 6 },
      sets: { a: 1, b: 1 },
      phase: { kind: "Tiebreaker" },
    });
  });
});

// each test run
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
