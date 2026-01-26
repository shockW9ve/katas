type Phase =
  | "Normal"
  | "Deuce"
  | "AdvantageA"
  | "AdvantageB"
  | "GameA"
  | "GameB"
  | "SetA"
  | "SetB"
  | "Tiebreaker"
  | "Match";
export type Player = "A" | "B";
export type Event = { type: "PointWon"; by: Player };
export type MatchState = Readonly<{
  points: Points;
  games: Games;
  sets: Sets;
  tiebreaker: boolean;
}>;
export type Outcome =
  | "None"
  // | "PointA"
  // | "PointB"
  | "GameA"
  | "GameB"
  | "SetA"
  | "SetB"
  | "MatchA"
  | "MatchB";
export type Points = { a: number; b: number };
export type Games = { a: number; b: number };
export type Sets = { a: number; b: number };
type State = {
  a: string | undefined | number;
  b: string | undefined | number;
  games: Games;
  sets: Sets;
  phase: Phase;
};

interface Tennis {
  score(): State | Phase;
  point(point: Player): void;
}

function transition(
  state: MatchState,
  event: Event,
): { next: MatchState; outcome: Outcome } {
  const outcome = phaseFor(
    state.points,
    state.games,
    state.sets,
    state.tiebreaker,
  );

  switch (outcome) {
    case "Normal":
      break;
    case "GameA":
      break;
    case "GameB":
      break;
    case "SetA":
      break;
    case "SetB":
      break;
  }

  return {
    next: {
      points: applyPoint(state.points, event.by),
      games: applyGame(state.games, event.by),
      sets: applySet(state.sets, event.by),
      tiebreaker: false,
    },
    outcome: "None",
  };
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

export function formatScore(
  points: Points,
  games: Games,
  sets: Sets,
  currentPhase: Phase,
): State | Phase {
  const pointArray: Array<string> = ["0", "15", "30", "40"];
  if (currentPhase == "Tiebreaker") {
    return {
      a: points.a,
      b: points.b,
      games: { a: games.a, b: games.b },
      sets: { a: sets.a, b: sets.b },
      phase: currentPhase,
    };
  } else if (points.a >= 7 || points.b >= 7) {
    return {
      a: points.a,
      b: points.b,
      games: { a: games.a, b: games.b },
      sets: { a: sets.a, b: sets.b },
      phase: currentPhase,
    };
  } else {
    return {
      a: pointArray[points.a],
      b: pointArray[points.b],
      games: { a: games.a, b: games.b },
      sets: { a: sets.a, b: sets.b },
      phase: currentPhase,
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

// TODO rename outcome?
function phaseFor(
  points: Points,
  games: Games,
  sets: Sets,
  tiebreaker: boolean,
): Phase {
  // TODO use tiebreaker
  let timeToReset = true;
  if (Math.max(sets.a, sets.b) >= 3 && Math.abs(sets.a - sets.b) >= 1) {
    return "Match";
  } else if (games.a >= 6 && games.b >= 6 && games.a === games.b) {
    if (
      Math.max(points.a, points.b) >= 7 &&
      Math.abs(points.a - points.b) >= 2
    ) {
      return "Match";
    }

    // TODO rethink
    if (timeToReset) {
      // this.resetPoints();
      timeToReset = false;
    }
    return "Tiebreaker";
  } else if (
    Math.max(games.a, games.b) >= 6 &&
    Math.abs(games.a - games.b) >= 2
  ) {
    if (points.a > points.b) {
      this.set("A");
      this.resetGames();
      return "SetA";
    } else {
      this.set("B");
      this.resetGames();
      return "SetB";
    }
  }
  if (Math.max(points.a, points.b) >= 5 && Math.abs(points.a - points.b) >= 2) {
    if (points.a > points.b) {
      this.game("A");
      this.resetPoints();
      return "GameA";
    } else {
      this.game("B");
      this.resetPoints();
      return "GameB";
    }
  } else if (points.a >= 3 && points.b >= 3 && points.a === points.b) {
    return "Deuce";
  } else if (
    points.a >= 3 &&
    points.b >= 3 &&
    Math.abs(points.a - points.b) === 1
  ) {
    if (points.a > points.b) {
      return "AdvantageA";
    } else {
      return "AdvantageB";
    }
  } else {
    return "Normal";
  }
}

export default class Game implements Tennis {
  // TODO make private!
  public points: Points = { a: 0, b: 0 };
  public games: Games = { a: 0, b: 0 };
  public sets: Sets = { a: 0, b: 0 };
  private _state: MatchState;
  private _tiebreaker: boolean = false;

  constructor() {
    console.log("Game initialized...");
    this._state = this.snapshot();
    // TODO log starting game state
  }

  resetPoints() {
    this.points = { a: 0, b: 0 };
  }

  resetGames() {
    this.games = { a: 0, b: 0 };
  }

  snapshot(): MatchState {
    return {
      points: this.points,
      games: this.games,
      sets: this.sets,
      tiebreaker: this._tiebreaker,
    };
  }

  point(player: Player) {
    this.points = applyPoint(this.points, player);

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

  game(player: Player) {
    this.games = applyGame(this.games, player);
    // const phase = this.phaseFor(this.points, this.games, this.sets);
    // if (phase == "SetA" || phase == "SetB") {
    //   this.set(player);
    //   this.resetGames();
    // }
  }

  set(player: Player) {
    this.sets = applySet(this.sets, player);
    // let timeToReset = true;
    // const phase = phaseFor(this.points, this.games, this.sets);
    // if (phase == "Tiebreaker") {
    //   if (timeToReset) {
    //     this.resetPoints();
    //     timeToReset = false;
    //   }
    // }
  }

  // TODO rename outcome?
  phaseFor(points: Points, games: Games, sets: Sets): Phase {
    let timeToReset = true;
    if (Math.max(sets.a, sets.b) >= 3 && Math.abs(sets.a - sets.b) >= 1) {
      return "Match";
    } else if (games.a >= 6 && games.b >= 6 && games.a === games.b) {
      if (
        Math.max(points.a, points.b) >= 7 &&
        Math.abs(points.a - points.b) >= 2
      ) {
        return "Match";
      }

      if (timeToReset) {
        this.resetPoints();
        timeToReset = false;
      }
      return "Tiebreaker";
    } else if (
      Math.max(games.a, games.b) >= 6 &&
      Math.abs(games.a - games.b) >= 2
    ) {
      if (points.a > points.b) {
        this.set("A");
        this.resetGames();
        return "SetA";
      } else {
        this.set("B");
        this.resetGames();
        return "SetB";
      }
    }
    if (
      Math.max(points.a, points.b) >= 5 &&
      Math.abs(points.a - points.b) >= 2
    ) {
      if (points.a > points.b) {
        this.game("A");
        this.resetPoints();
        return "GameA";
      } else {
        this.game("B");
        this.resetPoints();
        return "GameB";
      }
    } else if (points.a >= 3 && points.b >= 3 && points.a === points.b) {
      return "Deuce";
    } else if (
      points.a >= 3 &&
      points.b >= 3 &&
      Math.abs(points.a - points.b) === 1
    ) {
      if (points.a > points.b) {
        return "AdvantageA";
      } else {
        return "AdvantageB";
      }
    } else {
      return "Normal";
    }
  }

  score(): State | Phase {
    let phase = this.phaseFor(this.points, this.games, this.sets);
    return formatScore(this.points, this.games, this.sets, phase);
  }
}
