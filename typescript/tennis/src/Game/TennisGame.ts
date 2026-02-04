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
  | { kind: "EnteredTiebreaker" }
  | { kind: "GameWon"; by: Player }
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
  const TIEBREAK_POINTS_HIGH = 7;
  const TIEBREAK_POINTS_LOW = 2;
  const SETS_TO_WIN_MATCH = 3;
  if (
    games.a >= GAMES_TO_WIN_SET &&
    games.b >= GAMES_TO_WIN_SET &&
    games.a === games.b &&
    !tiebreaker
  ) {
    return { kind: "EnteredTiebreaker" };
  }

  if (tiebreaker) {
    const wonMatch =
      Math.max(points.a, points.b) >= TIEBREAK_POINTS_HIGH &&
      Math.abs(points.a - points.b) >= TIEBREAK_POINTS_LOW;

    wonMatch ? { kind: "SetWon", by: player } : { kind: "None" };
  }

  if (
    Math.max(sets.a, sets.b) >= SETS_TO_WIN_MATCH &&
    Math.abs(sets.a - sets.b) >= 1
  ) {
    return { kind: "MatchWon", by: player };
  } else if (
    Math.max(games.a, games.b) >= GAMES_TO_WIN_SET &&
    Math.abs(games.a - games.b) >= 2
  ) {
    return { kind: "SetWon", by: player };
  } else if (
    Math.max(points.a, points.b) >= POINTS_TO_WIN_GAME &&
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
  if (nextOutcome.kind === "EnteredTiebreaker") {
    return {
      next: {
        points: { a: 0, b: 0 },
        games: state.games,
        sets: state.sets,
        tiebreaker: true,
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
    const resetPoints = isGameWin(state.points);
    const resetGames = isSetWin(state.games);
    return {
      next: {
        points: resetPoints,
        games: resetGames,
        sets: setState,
        tiebreaker: false,
      },
      outcome: nextOutcome,
    };
  } else if (nextOutcome.kind === "GameWon") {
    const enteringTiebreaker = state.games.a === 6 && state.games.b === 6;
    const gameState = applyGame(state.games, eventBy);
    const resetPoints = isGameWin(state.points);
    return {
      next: {
        points: { a: 0, b: 0 },
        games: gameState,
        sets: state.sets,
        tiebreaker: enteringTiebreaker,
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
  private _matchFinished: boolean = false;

  constructor(initial: MatchState) {
    console.log("Game initialized...");
    console.log("\u{1F600}");

    this._state = initial;

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
    return this._matchFinished;
  }
}
