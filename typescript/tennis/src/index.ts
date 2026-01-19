import Game from "../src/Game/TennisGame.js";

export const hello = () => "Kal Was Flam";

const gaming: Game = new Game();
let isActive: boolean = true;
while (isActive) {
  // let num = Math.floor(Math.random() * 1) + 1;
  let num = 2;
  if (num === 1) {
    gaming.point("A");
  } else {
    gaming.point("B");
  }

  // sleep(3000);
  let state = gaming.score();
  if (state.phase === "GameA" || state.phase === "GameB") {
    isActive = false;
  }
}
console.log(gaming.score());

// async function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
