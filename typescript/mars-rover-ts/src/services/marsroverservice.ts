import { directionalDelta } from "../helpers/movementExtension";
import { Direction } from "../helpers/direction";
import { MovementStatus, Status } from "../helpers/status";
import { MarsRover } from "../models/marsrover";
import { Plateau } from "../models/plateau";
import { Position } from "../models/position.js";

export function execute(
  rover: MarsRover,
  plateau: Plateau,
  commands: string,
): MovementStatus {
  if (!commands) {
    return { position: rover.position, status: Status.InvalidCommand };
  }
  // trim and uppercase
  // todo global regex to normalize all whitespace
  const sanitized = commands.trim().replace(" ", "").toUpperCase();
  // validate commands
  const isValid: boolean = isValidCommands(sanitized);
  if (!isValid) {
    return { position: rover.position, status: Status.InvalidCommand };
  }
  // iterate commands
  const charArray: string[] = sanitized.split("");
  // todo make a for loop instead so i can return if blocked or out of bound
  charArray.forEach((command: string) => {
    switch (command) {
      case "L":
        rover.turnLeft();
        break;
      case "R":
        rover.turnRight();
        break;
      case "M":
        let status: MovementStatus = handleMovement(rover, plateau);
        if (status.status !== Status.ValidMove) {
          return status;
        }
        break;
      default:
        assertUnreachable(command);
    }
  });

  return { position: rover.position, status: Status.Completed };
}

function calculateDelta(rover: MarsRover): Position {
  const delta = directionalDelta(rover.heading);
  const candidate: Position = {
    x: rover.position.x + delta.dx,
    y: rover.position.y + delta.dy,
  };

  return candidate;
}

function isValidCommands(commands: string): boolean {
  const pattern = /^[LRM]{*}$/;
  if (pattern.test(commands)) {
    return true;
  }
  return false;
}

function handleMovement(rover: MarsRover, plateau: Plateau): MovementStatus {
  // calculate delta
  const delta: Position = calculateDelta(rover);
  // candidateMove
  const movementStatus: MovementStatus = plateau.candidateMove(
    delta,
    rover.position,
  );
  // update rover
  if (movementStatus.status === Status.ValidMove) {
    rover.advanceTo(movementStatus.position);
  }
  return movementStatus;
}

function assertUnreachable(ex: string): never {
  throw new Error(`Something went wrong -> ${ex}`);
}
