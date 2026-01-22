import Game from "../src/Game/TennisGame.js";

export const hello = () => "Kal Was Flam";

const gaming: Game = new Game();
let isActive: boolean = true;
while (isActive) {
  let num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
  if (num === 1) {
    gaming.point("A");
  } else {
    gaming.point("B");
  }

  let state = gaming.score();
  if (state === "GameA" || state === "GameB") {
    if (state === "GameA") {
      gaming.game("A");
    } else {
      gaming.game("B");
    }
    gaming.resetPoints();
  }
  if (state === "SetA" || state === "SetB") {
    if (state === "SetA") {
      gaming.set("A");
    } else {
      gaming.set("B");
    }
    gaming.resetPoints();
  }
  if (state === "Match") {
    isActive = false;
  }

  console.log(gaming.score());
}
