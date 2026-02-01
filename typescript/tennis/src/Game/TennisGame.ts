type PhaseKind = "Normal" | "Deuce" | "Advantage" | "Tiebreaker";
type Phase = { kind: PhaseKind; who?: Player };
export type Player = "A" | "B";
export type Event = { type: "PointWon"; by: Player };
export type MatchState = Readonly<{
  points: Points;
  games: Games;
  sets: Sets;
  tiebreaker: boolean;
}>;
export type Outcome =
  | { kind: "None" }
  | { kind: "GameWon"; by: Player }
  | { kind: "Tiebreaker"; state: boolean }
  | { kind: "SetWon"; by: Player }
  | { kind: "MatchWon"; by: Player };
export type Points = { a: number; b: number };
export type Games = { a: number; b: number };
export type Sets = { a: number; b: number };

interface Tennis {
  score(): ScoreView;
  snapshot(): MatchState;
  point(point: Player): void;
  game(): boolean;
}

export function calculateOutcome(
  points: Points,
  games: Games,
  sets: Sets,
  player: Player,
  tiebreaker: boolean,
): Outcome {
  const GAMES_TO_WIN_SET = 6;
  const POINTS_TO_WIN_GAME = 4;
  const TIEBREAK_POINTS = 7;
  const SETS_TO_WIN_MATCH = 2;
  if (games.a >= 6 && games.b >= 6 && games.a === games.b) {
    tiebreaker = true;
    if (
      Math.max(points.a, points.b) >= 7 &&
      Math.abs(points.a - points.b) >= 2
    ) {
      return { kind: "MatchWon", by: player };
    }

    return { kind: "Tiebreaker", state: tiebreaker };
  }

  if (Math.max(sets.a, sets.b) >= 3 && Math.abs(sets.a - sets.b) >= 1) {
    return { kind: "MatchWon", by: player };
  } else if (
    Math.max(games.a, games.b) >= 6 &&
    Math.abs(games.a - games.b) >= 2
  ) {
    return { kind: "SetWon", by: player };
  } else if (
    Math.max(points.a, points.b) >= 4 &&
    Math.abs(points.a - points.b) >= 2
  ) {
    return { kind: "GameWon", by: player };
  } else {
    return { kind: "None" };
  }
}
export function addPoint(
  state: MatchState,
  eventBy: Player,
): { next: MatchState; outcome: Outcome } {
  const nextPoints: Points = applyPoint(state.points, eventBy);
  const nextOutcome: Outcome = calculateOutcome(
    nextPoints,
    state.games,
    state.sets,
    eventBy,
    state.tiebreaker,
  );
  if (nextOutcome.kind === "Tiebreaker") {
    return {
      next: {
        points: { a: 0, b: 0 },
        games: state.games,
        sets: state.sets,
        tiebreaker: nextOutcome.state,
      },
      outcome: nextOutcome,
    };
  }

  if (nextOutcome.kind === "MatchWon") {
    return {
      next: {
        points: state.points,
        games: state.games,
        sets: state.sets,
        tiebreaker: state.tiebreaker,
      },
      outcome: nextOutcome,
    };
  } else if (nextOutcome.kind === "SetWon") {
    const setState = applySet(state.sets, eventBy);
    return {
      next: {
        points: { a: 0, b: 0 },
        games: { a: 0, b: 0 },
        sets: setState,
        tiebreaker: state.tiebreaker,
      },
      outcome: nextOutcome,
    };
  } else if (nextOutcome.kind === "GameWon") {
    const gameState = applyGame(state.games, eventBy);
    return {
      next: {
        points: { a: 0, b: 0 },
        games: gameState,
        sets: state.sets,
        tiebreaker: state.tiebreaker,
      },
      outcome: nextOutcome,
    };
  } else {
    return {
      next: {
        points: nextPoints,
        games: state.games,
        sets: state.sets,
        tiebreaker: state.tiebreaker,
      },
      outcome: nextOutcome,
    };
  }
}

function transition(
  state: MatchState,
  event: Event,
): { next: MatchState; outcome: Outcome } {
  const afterState = addPoint(state, event.by);
  return afterState;
}

export function applyPoint(points: Points, player: Player): Points {
  const nextA: number = points.a + (player == "A" ? 1 : 0);
  const nextB: number = points.b + (player == "B" ? 1 : 0);
  return { a: nextA, b: nextB };
}

export function applyGame(games: Games, player: Player): Games {
  const nextA: number = games.a + (player == "A" ? 1 : 0);
  const nextB: number = games.b + (player == "B" ? 1 : 0);
  return { a: nextA, b: nextB };
}

export function applySet(sets: Sets, player: Player): Sets {
  const nextA: number = sets.a + (player == "A" ? 1 : 0);
  const nextB: number = sets.b + (player == "B" ? 1 : 0);
  return { a: nextA, b: nextB };
}

type ScoreView = {
  pointsA?: string | undefined;
  pointsB?: string | undefined;
  games: Games;
  sets: Sets;
  phase: Phase;
};

export function formatScore(state: MatchState, phase: Phase): ScoreView {
  const pointArray: Array<string> = ["0", "15", "30", "40"];
  if (phase.kind === "Tiebreaker") {
    return {
      games: { a: state.games.a, b: state.games.b },
      sets: { a: state.sets.a, b: state.sets.b },
      phase: phase,
    };
  } else {
    return {
      pointsA: pointArray[state.points.a],
      pointsB: pointArray[state.points.b],
      games: { a: state.games.a, b: state.games.b },
      sets: { a: state.sets.a, b: state.sets.b },
      phase: phase,
    };
  }
}

export function phaseFor(state: MatchState): Phase {
  if (
    state.points.a >= 3 &&
    state.points.b >= 3 &&
    state.points.a === state.points.b
  ) {
    return { kind: "Deuce" };
  } else if (
    state.points.a >= 3 &&
    state.points.b >= 3 &&
    Math.abs(state.points.a - state.points.b) === 1
  ) {
    if (state.points.a > state.points.b) {
      return { kind: "Advantage", who: "A" };
    } else {
      return { kind: "Advantage", who: "B" };
    }
  } else {
    return { kind: "Normal" };
  }
}

export default class Game implements Tennis {
  private _state: MatchState;
  private _tiebreaker: boolean = false;
  private _isGame: boolean = false;

  constructor() {
    console.log("Game initialized...");
    console.log("\u{1F600}");

    this._state = {
      points: { a: 0, b: 0 },
      games: { a: 0, b: 0 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    const { pointsA, pointsB, games, sets, phase } = this.score();
    console.log(`Starting scoreboard:
                  points A: ${pointsA} - points B: ${pointsA}
                  games: ${games.a} : ${games.b}
                  sets:  ${sets.a}  : ${sets.b}
                  phase: ${phase.kind} `);
  }

  snapshot(): MatchState {
    return {
      points: this._state.points,
      games: this._state.games,
      sets: this._state.sets,
      tiebreaker: this._state.tiebreaker,
    };
  }

  point(player: Player): void {
    const { next, outcome } = transition(this.snapshot(), {
      type: "PointWon",
      by: player,
    });
    this._state = next;
    if (outcome.kind === "MatchWon") {
      this._isGame = true;
    }
  }

  score(): ScoreView {
    const phase: Phase = phaseFor(this._state);
    return formatScore(this._state, phase);
  }

  game(): boolean {
    return this._isGame;
  }
}
