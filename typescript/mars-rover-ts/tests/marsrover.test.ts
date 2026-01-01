import { describe, it, expect } from "vitest";
import { MarsRover, RoverLocation } from "../src/models/marsrover.js";
import { Position } from "../src/models/position.js";
import { Direction } from "../src/helpers/direction.js";

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
});
