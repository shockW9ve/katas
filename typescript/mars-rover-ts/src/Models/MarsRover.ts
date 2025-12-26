import { Direction } from "../Helpers/Direction.js";
import assert, { throws } from "node:assert";

export class MarsRover {
  private x: number;
  private y: number;
  private heading: Direction = Direction.North;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setX(value: number): void {
    this.x = value;
  }

  setY(value: number): void {
    this.y = value;
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
        assert(this.heading, "Wrong direction");
        break;
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

  isInBound(): void {
    switch (this.heading) {
      case Direction.North:
        this.y++;
        break;
      case Direction.East:
        this.x++;
        break;
      case Direction.South:
        this.y--;
        break;
      case Direction.West:
        this.x--;
        break;
      default:
        throw new Error("Something went wrong");
    }
  }
}
