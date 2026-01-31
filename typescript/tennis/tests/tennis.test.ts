import { describe, it, expect } from "vitest";
import Game, {
  Points,
  applyPoint,
  Games,
  applyGame,
  Sets,
  applySet,
  phaseFor,
  calculateOutcome,
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
  // describe('Handling Complex Data Sets', () => {
  //
  //     it.each([
  //
  //       [{ employee: { id: 104, name: 'Harman', designation: ['engineer'] } }, 104, 'Harman', true],
  //
  //       [{ employee: { id: 206, name: 'Cardin', designation: ['lead'] } }, 206, 'Cardin', true],
  //
  //       [{ employee: { id: 398, name: 'John', designation: ['manager','engineer'] } }, 398, 'John', false],
  //
  //       [{ employee: { id: 498, name: 'Joseph', designation: [] } }, 498, 'Joseph', true],
  //
  //       [{ employee: { id: 598, name: 'Jyoyta', designation: ['intern'] } }, 598, 'Jyoyta', true],
  //
  //     ])('Check for bonus payable to %o', (data, id, expectedName, isBonusPayable) => {
  it.each([
    [
      {
        matchState: {
          points: { a: 0, b: 0 },
          games: { a: 0, b: 0 },
          sets: { a: 0, b: 0 },
          tiebreaker: false,
        },
        player: "A",
        expected: {
          points: { a: 1, b: 0 },
          games: { a: 0, b: 0 },
          sets: { a: 0, b: 0 },
          tiebreaker: false,
        },
      },
    ],
  ])("%s", (matchState, player, expected) => {
    // arrange
    const game = new Game();
    game.point("A");
    const state = game.snapshot();
    expect(state).toBe(expected);
    // act
    // assert
  });
});
