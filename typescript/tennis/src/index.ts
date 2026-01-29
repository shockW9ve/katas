import Game from "../src/Game/TennisGame.js";
import Player from "../src/Game/TennisGame.js";

export const hello = () => "Kal Was Flam";

const gaming: Game = new Game();
let isActive: boolean = true;
let state;
while (isActive) {
  let num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  if (num === 1) {
    gaming.point("A");
  } else {
    gaming.point("B");
  }

  if (gaming.game()) {
    isActive = false;

    console.log("-- Final score ---");

    console.log(gaming.score());
    break;
  }

  console.log(gaming.score());
}
