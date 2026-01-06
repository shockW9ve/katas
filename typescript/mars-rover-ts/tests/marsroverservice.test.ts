import { describe, it, expect } from "vitest";
import { normalize, isValidCommands } from "../src/helpers/normalize.js";
import { MarsRover } from "../src/models/marsrover.js";
import { MovementStatus, Status } from "../src/helpers/status.js";
import { Plateau } from "../src/models/plateau.js";

describe("Mars rover service tests", () => {
  it("normalize commands", () => {
    // arrange
    // act
    // assert
    expect(normalize(" m r \n m")).toBe("MRM");
    expect(normalize("l rm\tl")).toBe("LRML");
  });

  it("validate commands", () => {
    // arrange
    // act
    // assert
    expect(isValidCommands("", true)).toBeTruthy();
    expect(isValidCommands("", false)).toBeFalsy();
    expect(isValidCommands("LRM")).toBeTruthy();
    expect(isValidCommands("LRMX")).toBeFalsy();
  });

  it("execute empty commands", () => {
    // arrange
    const marsrover: MarsRover = new MarsRover();
    const plateau: MovementPolicy = new Plateau();
    const commands: string = "";
    // act
    const status: MovementStatus = execute(marsrover, plateau, commands);
    // assert
    expect(isValidCommands("", true)).toBeTruthy();
    expect(isValidCommands("", false)).toBeFalsy();
    expect(isValidCommands("LRM")).toBeTruthy();
    expect(isValidCommands("LRMX")).toBeFalsy();
  });
});
