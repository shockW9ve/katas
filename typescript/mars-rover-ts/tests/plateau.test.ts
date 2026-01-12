import { describe, it, expect } from "vitest";
import { Position } from "../src/models/position.js";
import { Plateau } from "../src/models/plateau.js";
import { Direction } from "../src/helpers/direction.js";
import { MovementStatus, Status } from "../src/helpers/status.js";

describe("Plateau", () => {
  it("Grid", () => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const heightResult = plateau.height;
    const widthResult = plateau.width;
    const obstaclesResult = plateau.obstacles;
    // assert
    expect(heightResult).toBe(6);
    expect(widthResult).toBe(6);
    expect(obstaclesResult).toHaveLength(1);
  });

  it("Is in bound", () => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const position: Position = { x: 5, y: 5 };
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const inBound = plateau.isInBound(position);
    // assert
    expect(inBound).toBeTruthy();
  });

  it.each([
    { x: 6, y: 0, expected: false },
    { x: -1, y: 0, expected: false },
    { x: 0, y: 6, expected: false },
    { x: 0, y: -1, expected: false },
    { x: 0, y: 0, expected: true },
    { x: 0, y: 5, expected: true },
    { x: 5, y: 5, expected: true },
    { x: 5, y: 0, expected: true },
  ])("$x, $y -> $expected", ({ x, y, expected }) => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const position: Position = { x: x, y: y };
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const inBound = plateau.isInBound(position);
    // assert
    expect(inBound).toBe(expected);
  });

  it("Is blocked", () => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const position: Position = { x: 3, y: 3 };
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const inBound = plateau.isBlocked(position);
    // assert
    expect(inBound).toBeTruthy();
  });

  it.each([
    { x: 3, y: 3, expected: true },
    { x: 0, y: 0, expected: false },
  ])("$x, $y -> $expected", ({ x, y, expected }) => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const position: Position = { x: x, y: y };
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const inBound = plateau.isBlocked(position);
    // assert
    expect(inBound).toBe(expected);
  });

  it("Candidate move is blocked", () => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const position: Position = { x: 3, y: 2 };
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const direction: Direction = Direction.North;
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const movementStatus: MovementStatus = plateau.candidateMove(
      position,
      direction,
    );
    // assert
    expect(movementStatus.position).toBe(position);
    expect(movementStatus.status).toBe(Status.Blocked);
  });

  // TODO
  // missing blocked and validmove
  // missing candidate and current position
  it.each([
    {
      position: { x: 0, y: 5 },
      heading: Direction.North,
      expected: Status.OutOfBound,
    },
    {
      position: { x: 5, y: 3 },
      heading: Direction.East,
      expected: Status.OutOfBound,
    },
    {
      position: { x: 3, y: 0 },
      heading: Direction.South,
      expected: Status.OutOfBound,
    },
    {
      position: { x: 0, y: 0 },
      heading: Direction.West,
      expected: Status.OutOfBound,
    },
  ])("$position, $heading -> $expected", ({ position, heading, expected }) => {
    // arrange
    const width: number = 6;
    const height: number = 6;
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: Plateau = new Plateau(width, height, obstacles);
    // act
    const candidate: MovementStatus = plateau.candidateMove(position, heading);
    // assert
    expect(candidate.status).toBe(expected);
  });
});
