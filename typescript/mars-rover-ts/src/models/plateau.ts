import { Position } from "./position.js";
// import { directionalDelta } from "../helpers/movementExtension.js";
// import { Direction } from "../helpers/direction.js";
import { Status, MovementStatus } from "../helpers/status.js";

interface IMovementPolicy {
  isBlocked(position: Position): boolean;
  isInBound(position: Position): boolean;
  candidateMove(candidate: Position, current: Position): MovementStatus;
}

export class Plateau implements IMovementPolicy {
  readonly width: number;
  readonly height: number;
  readonly obstacles: Position[];
  private readonly obstacleKeys: Set<string>;
  keyOf = ({ x, y }: Position) => `${x},${y}`;

  constructor(width: number, height: number, obstacles: Array<Position>) {
    this.width = width;
    this.height = height;
    this.obstacles = obstacles;
    this.obstacleKeys = new Set(obstacles.map(this.keyOf));
  }

  candidateMove(candidate: Position, current: Position): MovementStatus {
    // const delta = directionalDelta(heading);
    // const candidate: Position = {
    //   x: current.x + delta.dx,
    //   y: current.y + delta.dy,
    // };

    if (!this.isInBound(candidate)) {
      return { position: candidate, status: Status.OutOfBound };
    } else if (this.isBlocked(candidate)) {
      return { position: current, status: Status.Blocked };
    } else {
      return { position: candidate, status: Status.ValidMove };
    }
  }

  isBlocked(position: Position): boolean {
    if (this.obstacleKeys.has(this.keyOf(position))) {
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
