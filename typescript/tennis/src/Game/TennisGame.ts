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
enum phase {
  Normal,
  Deuce,
  Advantage,
  Tiebreaker,
}

type State = {
  playerA: string;
  playerB: string;
  phase: phase;
};

type PlayerId = "A" | "B";

interface Tennis {}
class Player {
  private point: number;
  private game: number;
  private set: number;
  private id: PlayerId;

  constructor(id: PlayerId) {
    this.point = 0;
    this.game = 0;
    this.set = 0;
    this.id = id;
  }

  public getPlayerId(): PlayerId {
    return this.id;
  }
}
export default class TennisGame implements Tennis {
  private playerA: Player;
  private playerB: Player;
  private score: string;

  constructor(playerA: Player, playerB: Player) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.score = "0-0";
  }

  point(player: PlayerId) {}
  currentScore(): string {
    return "";
  }
  nextState(player: string, state: State): State {
    return { playerA: "15", playerB: "0", phase: phase.Normal };
  }
}
