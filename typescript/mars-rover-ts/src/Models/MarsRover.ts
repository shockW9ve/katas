import { Dir } from "node:fs";
import { Direction } from "../Helpers/Direction";
import assert from "node:assert";

export class MarsRover {
  private x: number;
  private y: number;
  private heading: Direction;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(value: number) {
    this.x = value;
  }

  setY(value: number) {
    this.y = value;
  }

  turnRight() {
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

  turnLeft() {}

  advanceto() {}
}
