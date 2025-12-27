import { Direction } from "../helpers/Direction.js";
import { directionalDelta } from "../helpers/MovementExtension.js";
import { Position } from "./position.js";

export class MarsRover {
  heading: Direction;
  position: Position;

  constructor(position: Position) {
    this.position = position;
    this.heading = Direction.North;
  }

  turnRight(): void {
    switch (this.heading) {
      case Direction.North:
        this.heading = Direction.East;
        break;
      case Direction.East:
        this.heading = Direction.South;
        break;
      case Direction.South:
        this.heading = Direction.West;
        break;
      case Direction.West:
        this.heading = Direction.North;
        break;
      default:
        throw new Error("Something went wrong");
    }
  }

  turnLeft(): void {
    switch (this.heading) {
      case Direction.North:
        this.heading = Direction.West;
        break;
      case Direction.East:
        this.heading = Direction.North;
        break;
      case Direction.South:
        this.heading = Direction.East;
        break;
      case Direction.West:
        this.heading = Direction.South;
        break;
      default:
        throw new Error("Something went wrong");
    }
  }

  advanceTo(): void {
    let delta = directionalDelta(this.heading);

    this.position = {
      x: this.position.x + delta.dx,
      y: this.position.y + delta.dy,
    };
  }
}
