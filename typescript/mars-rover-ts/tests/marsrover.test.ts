import { describe, it, expect } from "vitest";
import { MarsRover } from "../src/models/marsrover.js";
import { Position } from "../src/models/position.js";
import { Direction } from "../src/helpers/direction.js";

describe("Mars Rover", () => {
  it("Report heading", () => {
    // arrange
    const position: Position = { x: 3, y: 3 };
    const rover: MarsRover = new MarsRover(position);
    // act
    const result = rover.report();
    // assert
    expect(result).toBe(
      `x: ${rover.position.x} y: ${rover.position.y} heading: ${rover.heading}`,
    );
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
});
