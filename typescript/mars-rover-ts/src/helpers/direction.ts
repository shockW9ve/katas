export enum Direction {
  North,
  East,
  South,
  West,
}

// Keep the order you want to rotate through
const RING = [
  Direction.North,
  Direction.East,
  Direction.South,
  Direction.West,
] as const;

// Fast lookup from direction -> index in the ring
const IDX: Record<Direction, number> = {
  [Direction.North]: 0,
  [Direction.East]: 1,
  [Direction.South]: 2,
  [Direction.West]: 3,
} as const;

type Turn = "L" | "R";
const STEP: Record<Turn, number> = { L: -1, R: +1 } as const;

// Single rotation function
export function rotate(dir: Direction, turn: Turn): Direction {
  const i = IDX[dir];
  const next = (i + STEP[turn] + RING.length) % RING.length; // +RING.length handles negatives
  return RING[next];
}
