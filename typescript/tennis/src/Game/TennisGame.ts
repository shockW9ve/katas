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
enum Phase {
  Normal,
  Deuce,
  Advantage,
  Game,
  Tiebreaker,
}

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

type Player = "A" | "B";
type Points = { a: number; b: number };
type State = { a: string; b: string; phase: Phase };

interface Tennis {
  score(): State;
  point(point: Player): void;
}
function applyPoint(points: Points, player: Player): Points {}

function formatScore(points: Points): State {}

export default class Game implements Tennis {
  private points: Points = { a: 0, b: 0 };
  point(player: Player) {
    this.points = applyPoint(this.points, player);
  }
  score(): State {
    return formatScore(this.points);
  }
  constructor() {
    console.log("Game initialized...");
  }
}
// private readonly points: Map<number, string> = new Map([
//   [0, "0"],
//   [1, "15"],
//   [2, "30"],
//   [3, "40"],
//   [4, "Advantage"],
//   [5, "Game"],
// ]);
//
// constructor() {
//   // this.playerA = playerA;
//   // this.playerB = playerB;
//   // this.points = new Set(points.map(this.score));
//   this.pointA = 0;
//   this.pointB = 0;
//   this.currentPhase = Phase.Normal;
// }
//
// point(player: PlayerId) {
//   if (player === "A") {
//     this.pointA++;
//     this.currentPhase = this.phase();
//   } else {
//     this.pointB++;
//     this.currentPhase = this.phase();
//   }
// }
//
// score(): string {
//   return `${this.points.get(this.pointA)}-${this.points.get(this.pointB)}`;
// }
//
// state(player: PlayerId): State {
//   if (player === "A") {
//     const nextScore = this.points.get(this.pointA);
//     const currentScore = this.points.get(this.pointB);
//     return {
//       playerA: nextScore,
//       playerB: currentScore,
//       phase: this.currentPhase,
//     };
//   } else {
//     const nextScore = this.points.get(this.pointB);
//     const currentScore = this.points.get(this.pointA);
//     return {
//       playerA: currentScore,
//       playerB: nextScore,
//       phase: this.currentPhase,
//     };
//   }
// }
// nextState(player: PlayerId): State {
//   if (player === "A") {
//     // TODO USE STATE
//     const nextScore = this.points.get(this.pointA + 1);
//     const currentScore = this.points.get(this.pointB);
//     return {
//       playerA: nextScore,
//       playerB: currentScore,
//       phase: this.currentPhase,
//     };
//   } else {
//     const nextScore = this.points.get(this.pointB + 1);
//     const currentScore = this.points.get(this.pointA);
//     return {
//       playerA: currentScore,
//       playerB: nextScore,
//       phase: this.currentPhase,
//     };
//   }
// }
//
// phase(): Phase {
//   if (this.pointA < 3 && this.pointB < 3) {
//     return Phase.Normal;
//   } else if (
//     (this.pointA === 3 && this.pointB < 3) ||
//     (this.pointB === 3 && this.pointA < 3)
//   ) {
//     return Phase.Fortyland;
//   } else if (
//     this.pointA === 3 &&
//     this.pointB === 3 &&
//     this.pointA === this.pointB
//   ) {
//     return Phase.Deuce;
//   } else if (
//     this.pointA >= 3 &&
//     this.pointB >= 3 &&
//     Math.abs(this.pointA - this.pointB) === 1
//   ) {
//     return Phase.Advantage;
//   } else if (
//     Math.max(this.pointA, this.pointB) >= 4 &&
//     Math.abs(this.pointA - this.pointB) >= 2
//   ) {
//     return Phase.Game;
//   }
//   return Phase.Tiebreaker;
// }
// }
