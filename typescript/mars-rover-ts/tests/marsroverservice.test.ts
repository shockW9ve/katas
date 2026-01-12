import { describe, it, expect } from "vitest";
import { normalize, isValidCommands } from "../src/helpers/normalize.js";
import { MarsRover } from "../src/models/marsrover.js";
import { MovementStatus, Status } from "../src/helpers/status.js";
import { Plateau, MovementPolicy } from "../src/models/plateau.js";
import { Position } from "../src/models/position.js";
import { execute } from "../src/services/marsroverservice.js";

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

  it("execute empty sanitized command", () => {
    // arrange
    const height: number = 6;
    const width: number = 6;
    const marsrover: MarsRover = new MarsRover({ x: 0, y: 0 });
    const obstacles: Position[] = [{ x: 3, y: 3 }];
    const plateau: MovementPolicy = new Plateau(width, height, obstacles);
    const commands: string = "";
    // act
    const status: MovementStatus = execute(marsrover, plateau, commands);
    // assert
    expect(status).toStrictEqual({
      position: { x: 0, y: 0 },
      status: Status.Completed,
    });
  });

  it.each([
    {
      command: "ml",
      expected: { position: { x: 0, y: 1 }, status: Status.Completed },
    },
    {
      command: "mrm",
      expected: { position: { x: 1, y: 1 }, status: Status.Completed },
    },
    {
      command: "mrmlmm",
      expected: { position: { x: 1, y: 3 }, status: Status.Completed },
    },
    {
      command: "mmrrm",
      expected: { position: { x: 0, y: 1 }, status: Status.Completed },
    },
  ])(
    "execute multiple valid commands $command --> $expected",
    ({ command, expected }) => {
      // arrange
      const height: number = 6;
      const width: number = 6;
      const marsrover: MarsRover = new MarsRover({ x: 0, y: 0 });
      const obstacles: Position[] = [{ x: 3, y: 3 }];
      const plateau: MovementPolicy = new Plateau(width, height, obstacles);
      // act
      const status: MovementStatus = execute(marsrover, plateau, command);
      // assert
      expect(status).toStrictEqual(expected);
    },
  );
});
