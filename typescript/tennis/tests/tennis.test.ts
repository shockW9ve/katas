import { describe, it, expect } from "vitest";
import Game, {
  Points,
  applyPoint,
  Games,
  applyGame,
  Sets,
  applySet,
  phaseFor,
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
      game.points = { a: 4, b: 4 };
      game.point("A");
      const phase = game.phaseFor(game.points, game.games, game.sets);
      expect(phase).toBe("AdvantageA");
    });

    it("AdvantageB phase", () => {
      const game = new Game();
      game.points = { a: 4, b: 4 };
      game.point("B");
      const phase = game.phaseFor(game.points, game.games, game.sets);
      expect(phase).toBe("AdvantageB");
    });

    it("GameA phase", () => {
      const game = new Game();
      game.points = { a: 5, b: 3 };
      game.point("A");
      game.point("A");
      game.point("A");
      game.point("A");
      game.point("B");

      game.point("B");
      game.point("B");
      game.point("A");
      const phase = phaseFor(game.snapshot());
      expect(phase).toBe("GameA");
      expect(game.snapshot().games).toStrictEqual({ a: 1, b: 0 });
    });
  });

  it.each([
    {
      point: "A",
      expected: {},
    },
    {},
  ])("", (point, expected) => {
    // arrange
    const game = new Game();
    game.point(point);
    // act
    // assert
  });
});
