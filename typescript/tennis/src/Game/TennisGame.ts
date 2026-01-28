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
  | { kind: "SetWon"; by: Player }
  | { kind: "MatchWon"; by: Player };
export type Points = { a: number; b: number };
export type Games = { a: number; b: number };
export type Sets = { a: number; b: number };

// type State = {
//   a: string | undefined | number;
//   b: string | undefined | number;
//   games: Games;
//   sets: Sets;
//   phase: Phase;
// };

interface Tennis {
  score(): State | Phase;
  point(point: Player): void;
}

function calculateOutcome(points: Points, player: Player): Outcome {
  if (Math.max(points.a, points.b) > 4 && Math.abs(points.a - points.b) >= 2) {
    return { kind: "GameWon", by: player };
  } else {
    return { kind: "None" };
  }
}
function addPoint(
  state: MatchState,
  eventBy: Player,
  tiebreaker: boolean,
): { next: MatchState; outcome: Outcome } {
  const nextPoints: Points = applyPoint(state.points, eventBy);
  const nextOutcome: Outcome = calculateOutcome(nextPoints, eventBy);
  if (nextOutcome.kind === "GameWon") {
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
  const afterState = addPoint(state, event.by, state.tiebreaker);
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

type formatPoints = ["0", "15", "30", "40"];
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

// export function phaseFor(
//   points: Points,
//   games: Games,
//   sets: Sets,
//   game: Game,
//   player: Player,
// ): Phase {
// if (Math.max(sets.a, sets.b) >= 3 && Math.abs(sets.a - sets.b) >= 1) {
//   return "Match";
// } else if (games.a >= 6 && games.b >= 6 && games.a === games.b) {
//   if (
//     Math.max(points.a, points.b) >= 7 &&
//     Math.abs(points.a - points.b) >= 2
//   ) {
//     return "Match";
//   }
//
//   return "Tiebreaker";
// } else if (
//   Math.max(games.a, games.b) >= 6 &&
//   Math.abs(games.a - games.b) >= 2
// ) {
//   if (points.a > points.b) {
//     return "SetA";
//   } else {
//     return "SetB";
//   }
// }
//   if (Math.max(points.a, points.b) >= 5 && Math.abs(points.a - points.b) >= 2) {
//     if (points.a > points.b) {
//       return "GameA";
//     } else {
//       return "GameB";
//     }
//   } else if (points.a >= 3 && points.b >= 3 && points.a === points.b) {
//     return "Deuce";
//   } else if (
//     points.a >= 3 &&
//     points.b >= 3 &&
//     Math.abs(points.a - points.b) === 1
//   ) {
//     if (points.a > points.b) {
//       return "AdvantageA";
//     } else {
//       return "AdvantageB";
//     }
//   } else {
//     return "Normal";
//   }
// }

function phaseFor(
  state: MatchState,
  // tiebreaker: boolean,
): Phase {
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
  // if (
  //   Math.max(state.sets.a, state.sets.b) >= 3 &&
  //   Math.abs(state.sets.a - state.sets.b) >= 1
  // ) {
  //   return "Match";
  // } else if (
  //   state.games.a >= 6 &&
  //   state.games.b >= 6 &&
  //   state.games.a === state.games.b
  // ) {
  //   if (
  //     Math.max(state.points.a, state.points.b) >= 7 &&
  //     Math.abs(state.points.a - state.points.b) >= 2
  //   ) {
  //     return "Match";
  //   }

  // TODO rethink
  // if (timeToReset) {
  //   // this.resetPoints();
  //   timeToReset = false;
  // }
  // return "Tiebreaker";
  // } else if (
  //   Math.max(games.a, games.b) >= 6 &&
  //   Math.abs(games.a - games.b) >= 2
  // ) {
  //   if (points.a > points.b) {
  //     this.set("A");
  //     this.resetGames();
  //     return "SetA";
  //   } else {
  //     this.set("B");
  //     this.resetGames();
  //     return "SetB";
  //   }
  // }
  // if (Math.max(points.a, points.b) >= 5 && Math.abs(points.a - points.b) >= 2) {
  //   if (points.a > points.b) {
  //     this.game("A");
  //     this.resetPoints();
  //     return "GameA";
  //   } else {
  //     this.game("B");
  //     this.resetPoints();
  //     return "GameB";
  //   }
  // } else if (points.a >= 3 && points.b >= 3 && points.a === points.b) {
  //   return "Deuce";
  // } else if (
  //   points.a >= 3 &&
  //   points.b >= 3 &&
  //   Math.abs(points.a - points.b) === 1
  // ) {
  //   if (points.a > points.b) {
  //     return "AdvantageA";
  //   } else {
  //     return "AdvantageB";
  //   }
  // } else {
  //   return "Normal";
  // }
}

export default class Game implements Tennis {
  // TODO make private!
  // public points: Points = { a: 0, b: 0 };
  // public games: Games = { a: 0, b: 0 };
  // public sets: Sets = { a: 0, b: 0 };
  private _state: MatchState;
  private _tiebreaker: boolean = false;

  constructor() {
    console.log("Game initialized...");
    console.log("\u{1F600}");
    // this._state = this.snapshot();

    this._state = {
      points: { a: 0, b: 0 },
      games: { a: 0, b: 0 },
      sets: { a: 0, b: 0 },
      tiebreaker: false,
    };
    // TODO log starting game state
  }

  // resetPoints() {
  //   this.points = { a: 0, b: 0 };
  // }
  //
  // resetGames() {
  //   this.games = { a: 0, b: 0 };
  // }

  snapshot(): MatchState {
    return {
      points: this._state.points,
      games: this._state.games,
      sets: this._state.sets,
      tiebreaker: this._state.tiebreaker,
    };
  }

  point(player: Player) {
    // this.points = applyPoint(this.points, player);

    const { next } = transition(this.snapshot(), {
      type: "PointWon",
      by: player,
    });
    this._state = next;
    // const phase = phaseFor(this, player);
    // if (phase == "GameA" || phase == "GameB") {
    //   this.game(player);
    //   this.resetPoints();
    // }
  }

  score(): Phase {
    const phase = phaseFor(this._state);
    return formatScore(this._state, phase);
  }

  // game(player: Player) {
  //   this.games = applyGame(this.games, player);
  //   // const phase = this.phaseFor(this.points, this.games, this.sets);
  //   // if (phase == "SetA" || phase == "SetB") {
  //   //   this.set(player);
  //   //   this.resetGames();
  //   // }
  // }
  //
  // set(player: Player) {
  //   this.sets = applySet(this.sets, player);
  //   // let timeToReset = true;
  //   // const phase = phaseFor(this.points, this.games, this.sets);
  //   // if (phase == "Tiebreaker") {
  //   //   if (timeToReset) {
  //   //     this.resetPoints();
  //   //     timeToReset = false;
  //   //   }
  //   // }
  // }
  //
  // // TODO rename outcome?
  // phaseFor(points: Points, games: Games, sets: Sets): Phase {
  //   let timeToReset = true;
  //   if (Math.max(sets.a, sets.b) >= 3 && Math.abs(sets.a - sets.b) >= 1) {
  //     return "Match";
  //   } else if (games.a >= 6 && games.b >= 6 && games.a === games.b) {
  //     if (
  //       Math.max(points.a, points.b) >= 7 &&
  //       Math.abs(points.a - points.b) >= 2
  //     ) {
  //       return "Match";
  //     }
  //
  //     if (timeToReset) {
  //       this.resetPoints();
  //       timeToReset = false;
  //     }
  //     return "Tiebreaker";
  //   } else if (
  //     Math.max(games.a, games.b) >= 6 &&
  //     Math.abs(games.a - games.b) >= 2
  //   ) {
  //     if (points.a > points.b) {
  //       this.set("A");
  //       this.resetGames();
  //       return "SetA";
  //     } else {
  //       this.set("B");
  //       this.resetGames();
  //       return "SetB";
  //     }
  //   }
  //   if (
  //     Math.max(points.a, points.b) >= 5 &&
  //     Math.abs(points.a - points.b) >= 2
  //   ) {
  //     if (points.a > points.b) {
  //       this.game("A");
  //       this.resetPoints();
  //       return "GameA";
  //     } else {
  //       this.game("B");
  //       this.resetPoints();
  //       return "GameB";
  //     }
  //   } else if (points.a >= 3 && points.b >= 3 && points.a === points.b) {
  //     return "Deuce";
  //   } else if (
  //     points.a >= 3 &&
  //     points.b >= 3 &&
  //     Math.abs(points.a - points.b) === 1
  //   ) {
  //     if (points.a > points.b) {
  //       return "AdvantageA";
  //     } else {
  //       return "AdvantageB";
  //     }
  //   } else {
  //     return "Normal";
  //   }
  // }
}
