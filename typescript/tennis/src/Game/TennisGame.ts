// Tennis Scoring Phases
//
// Tennis scoring is divided into three main phases: points, games, and sets. Each phase has specific rules that determine how a player or team can win.
// Points
//
//     Scoring System:
//         0 points = Love
//         1 point = 15
//         2 points = 30
//         3 points = 40
//         4 points = Game (must win by 2 points)
//
//     Deuce: When both players reach 40, the score is called "deuce." From deuce, a player must win two consecutive points to win the game.
//
// Games
//
//     Winning a Game:
//         A player must win at least four points and have a two-point lead.
//         If the score reaches deuce, the next point won gives the player an "advantage" (Ad-In or Ad-Out).
//
// Sets
//
//     Winning a Set:
//         A set is won by the first player to win six games, with at least a two-game lead (e.g., 6-4).
//         If the score reaches 6-6, a tiebreaker is usually played.
//
//     Tiebreaker Rules:
//         Players score points as 0, 1, 2, etc.
//         The first player to reach seven points, with a two-point margin, wins the tiebreak and the set.
//
// Matches
//
//     Match Format:
//         Matches are typically played as best-of-three or best-of-five sets.
//         To win a match, a player must win the majority of the prescribed sets (2 out of 3 or 3 out of 5).
//

// export type State = {
//   playerA: string | undefined;
//   playerB: string | undefined;
//   phase: Phase;
// };

// export class Player {
//   private point: number;
//   private game: number;
//   private set: number;
//   private id: PlayerId;
//
//   constructor(id: PlayerId) {
//     this.point = 0;
//     this.game = 0;
//     this.set = 0;
//     this.id = id;
//   }
//
//   public getPlayerId(): PlayerId {
//     return this.id;
//   }
//
//   public getPoint(): string {
//     return `${this.point}`;
//   }
//
//   public setPoint() {
//     this.point += 15;
//   }
// }

type Phase =
  | "Normal"
  | "Deuce"
  | "AdvantageA"
  | "AdvantageB"
  | "GameA"
  | "GameB"
  | "Tiebreaker";
type Player = "A" | "B";
export type Points = { a: number; b: number };
type State = { a: string | undefined; b: string | undefined; phase: Phase };

interface Tennis {
  score(): State | Phase;
  point(point: Player): void;
}

export function applyPoint(points: Points, player: Player): Points {
  const nextA: number = points.a + (player == "A" ? 1 : 0);
  const nextB: number = points.b + (player == "B" ? 1 : 0);
  return { a: nextA, b: nextB };
}

export function formatScore(points: Points): State | Phase {
  const pointArray: Array<string> = ["0", "15", "30", "40"];
  const currentPhase = phaseFor(points);

  if (currentPhase != "Normal") {
    return currentPhase;
  } else {
    return {
      a: pointArray[points.a],
      b: pointArray[points.b],
      phase: phaseFor(points),
    };
  }
}

export function phaseFor(points: Points): Phase {
  if (Math.max(points.a, points.b) >= 4 && Math.abs(points.a - points.b) >= 2) {
    if (points.a > points.b) {
      return "GameA";
    } else {
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
  private points: Points = { a: 0, b: 0 };

  point(player: Player) {
    this.points = applyPoint(this.points, player);
  }

  score(): State | Phase {
    return formatScore(this.points);
  }
  constructor() {
    console.log("Game initialized...");
  }
}
