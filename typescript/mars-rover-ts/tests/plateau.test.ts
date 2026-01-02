import { describe, it, expect } from "vitest";
import { Position } from "../src/models/position.js";
import { Plateau } from "../src/models/plateau.js";

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
  ])("${x}, ${y}", ({ x, y, expected }) => {
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
});

// test.each([
//   { a: 1, b: 1, expected: 2 },
//   { a: 1, b: 2, expected: 3 },
//   { a: 2, b: 1, expected: 3 },
// ])('add($a, $b) -> $expected', ({ a, b, expected }) => {
//   expect(a + b).toBe(expected)
// })

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3

// test.each([
//   [1, 1, 2],
//   [1, 2, 3],
//   [2, 1, 3],
// ])('add($0, $1) -> $2', (a, b, expected) => {
//   expect(a + b).toBe(expected)
// })

// this will return
// ✓ add(1, 1) -> 2
// ✓ add(1, 2) -> 3
// ✓ add(2, 1) -> 3
