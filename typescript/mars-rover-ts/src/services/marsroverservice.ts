import { MovementStatus, Status } from "../helpers/status";
import { MarsRover } from "../models/marsrover";
import { Plateau } from "../models/plateau";

export function execute(
  rover: MarsRover,
  plateau: Plateau,
  commands: string,
): Status {
  // validate commands
  isValidCommands(commands);
  // calculate delta
  // candidateMove
  // update rover
  // return status
  const movementStatus: MovementStatus = plateau.candidateMove(
    rover.position,
    rover.heading,
  );

  if (movementStatus.status === Status.ValidMove) {
    rover.advanceTo(movementStatus.position);
  }
  return Status.Completed;
}

// tryMove(){
//     // TODO: Move to service and do trymove with delta and then pass the position here
//     let delta = directionalDelta(rover.heading);
//
//     const delta = directionalDelta(heading);
//     const candidate: Position = {
//       x: current.x + delta.dx,
//       y: current.y + delta.dy,
//     };
// }
//

function isValidCommands(commands: string): boolean {
  return true;
}
