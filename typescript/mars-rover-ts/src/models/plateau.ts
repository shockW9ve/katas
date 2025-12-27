import { Position } from "./Position.js";

interface IMovementPolicy {
  isBlocked(position: Position): boolean;
  isInBound(position: Position): boolean;
}

export class Plateau implements IMovementPolicy {
  private width: number;
  private height: number;
  private obstacles: Array<Position>;

  constructor(width: number, height: number, obstacles: Array<Position>) {
    this.width = width;
    this.height = height;
    this.obstacles = obstacles;
  }

  isBlocked(position: Position): boolean {
    if (this.obstacles.indexOf(position) > -1) {
      return true;
    }
    return false;
  }

  isInBound(position: Position): boolean {
    if (
      position.x < 0 ||
      position.x >= this.width ||
      position.y < 0 ||
      position.y >= this.height
    ) {
      return false;
    }
    return true;
  }
}
