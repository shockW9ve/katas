import { Direction } from "./direction.js";

export function directionalDelta(heading: Direction): {
  dx: number;
  dy: number;
} {
  switch (heading) {
    case Direction.North:
      return { dx: 0, dy: 1 };
    case Direction.East:
      return { dx: 1, dy: 0 };
    case Direction.South:
      return { dx: 0, dy: -1 };
    case Direction.West:
      return { dx: -1, dy: 0 };
    default:
      throw new Error("Something went wrong");
  }
}
