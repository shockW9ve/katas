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

  console.log(gaming.score());

  let state = gaming.score();
  if (state === "GameA" || state === "GameB") {
    isActive = false;
  }
}
