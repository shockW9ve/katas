import { Direction } from "./direction.js";
type Delta = {
  dx: number;
  dy: number;
};

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
      assertUnreachable(heading);
  }

  function assertUnreachable(ex: never): never {
    throw new Error(`Something went wrong -> ${ex}`);
  }

  // using map
  // const delta = new Map<Direction, Delta>();
  // delta.set(Direction.North, { dx: 0, dy: 1 });
  // delta.set(Direction.East, { dx: 1, dy: 0 });
  // delta.set(Direction.South, { dx: 0, dy: -1 });
  // delta.set(Direction.West, { dx: -1, dy: 0 });
  // return delta.get(heading);
}
