import { normalize, isValidCommands } from "../helpers/normalize.js";
import { MovementStatus, Status } from "../helpers/status";
import { MarsRover } from "../models/marsrover";
import { MovementPolicy } from "../models/plateau";

export function execute(
  rover: MarsRover,
  plateau: MovementPolicy,
  commands: string,
): MovementStatus {
  // normalize whitespace and uppercase
  const sanitized = normalize(commands);
  // validate commands
  const allowEmpty = true;
  if (!isValidCommands(sanitized, allowEmpty)) {
    return { position: rover.position, status: Status.InvalidCommand };
  }

  if (sanitized.length === 0) {
    return { position: rover.position, status: Status.Completed };
  }
  // iterate commands
  const array: string[] = sanitized.split("");
  for (const c of sanitized) {
    if (c === "L") {
      rover.turnLeft();
    } else if (c === "R") {
      rover.turnRight();
    } else {
      let status: MovementStatus = handleMovement(rover, plateau);
      if (status.status !== Status.ValidMove) {
        return status;
      }
    }
  }

  return { position: rover.position, status: Status.Completed };
}

function handleMovement(
  rover: MarsRover,
  policy: MovementPolicy,
): MovementStatus {
  // candidateMove
  const movementStatus: MovementStatus = policy.candidateMove(
    rover.position,
    rover.heading,
  );
  // update rover
  if (movementStatus.status === Status.ValidMove) {
    rover.advanceTo(movementStatus.position);
  }

  return movementStatus;
}
