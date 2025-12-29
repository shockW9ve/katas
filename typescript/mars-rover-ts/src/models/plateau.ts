import { Position } from "./position.js";
import { directionalDelta } from "../helpers/movementExtension.js";
import { Direction } from "../helpers/direction.js";

interface IMovementPolicy {
  isBlocked(position: Position): boolean;
  isInBound(position: Position): boolean;
  candidateMove(current: Position, heading: Direction): MovementStatus;
}

enum Status {
  InvalidCommand,
  ValidMove,
  Blocked,
  OutOfBound,
  Completed,
}

type MovementStatus = {
  position: Position;
  status: Status;
};

export class Plateau implements IMovementPolicy {
  private width: number;
  private height: number;
  private obstacles: Position[];
  private obstacleKeys: Set<string>;
  keyOf = ({ x, y }: Position) => `${x},${y}`;

  constructor(width: number, height: number, obstacles: Array<Position>) {
    this.width = width;
    this.height = height;
    this.obstacles = obstacles;
    this.obstacleKeys = new Set(obstacles.map(this.keyOf));
  }

  candidateMove(current: Position, heading: Direction): MovementStatus {
    const delta = directionalDelta(heading);
    const candidate: Position = {
      x: current.x + delta.dx,
      y: current.y + delta.dy,
    };

    if (this.isBlocked(candidate)) {
      return { position: candidate, status: Status.Blocked };
    } else if (!this.isInBound(candidate)) {
      return { position: candidate, status: Status.OutOfBound };
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
