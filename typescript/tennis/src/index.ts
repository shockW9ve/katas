import Game, { Player } from "../src/Game/TennisGame.js";

export const hello = () => "Kal Was Flam";

const playerOne = new Player("A");
const playerTwo = new Player("B");
const gaming = new Game(playerOne, playerTwo);
gaming.point(playerOne.getPlayerId());
console.log(gaming.currentScore());
