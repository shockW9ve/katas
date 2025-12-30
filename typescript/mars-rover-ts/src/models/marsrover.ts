import { Direction, rotate } from "../helpers/direction.js";
import { directionalDelta } from "../helpers/movementExtension.js";
import { Position } from "./position.js";

export class MarsRover {
  heading: Direction;
  position: Position;

  constructor(position: Position) {
    this.position = position;
    this.heading = Direction.North;
  }

  report(): string {
    return `x: ${this.position.x} y: ${this.position.y} heading: ${this.heading}`;
  }

  turnRight(): void {
    this.heading = rotate(this.heading, "R");
  }

  turnLeft(): void {
    this.heading = rotate(this.heading, "L");
  }

  advanceTo(next: Position): void {
    this.position = next;
  }
}
