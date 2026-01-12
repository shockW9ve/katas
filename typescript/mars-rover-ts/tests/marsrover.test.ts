import { describe, it, expect } from "vitest";
import { MarsRover, RoverLocation } from "../src/models/marsrover.js";
import { Position } from "../src/models/position.js";
import { Direction } from "../src/helpers/direction.js";

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

describe("Mars Rover", () => {
  it("Report heading", () => {
    // arrange
    const position: Position = { x: 3, y: 3 };
    const rover: MarsRover = new MarsRover(position);
    const location: RoverLocation = {
      coordinates: { x: position.x, y: position.y },
      heading: rover.heading,
    };
    // act
    const result = rover.report();
    // assert
    expect(result).toStrictEqual(location);
  });

  it("Turn right", () => {
    // arrange
    const position: Position = { x: 3, y: 3 };
    const rover: MarsRover = new MarsRover(position);
    // act
    rover.turnRight();
    // assert
    expect(rover.heading).toBe(Direction.East);
    expect(rover.position).toStrictEqual({ x: 3, y: 3 });
  });

  it("Turn left", () => {
    // arrange
    const position: Position = { x: 3, y: 3 };
    const rover: MarsRover = new MarsRover(position);
    // act
    rover.turnLeft();
    // assert
    expect(rover.heading).toBe(Direction.West);
    expect(rover.position).toStrictEqual({ x: 3, y: 3 });
  });

  it("Move forward", () => {
    // arrange
    const position: Position = { x: 3, y: 3 };
    const next: Position = { x: 3, y: 4 };
    const rover: MarsRover = new MarsRover(position);
    // act
    rover.advanceTo(next);
    // assert
    expect(rover.position).toStrictEqual({ x: 3, y: 4 });
    expect(rover.heading).toBe(Direction.North);
  });

  //   it.each([{ x: 3, y: 3 }])('advanceTo({$x, $y}) -> $expected', ({x, y, expected}) => {
  // expect({}).toBe(expected);
  //   });
});
