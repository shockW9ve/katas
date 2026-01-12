import { Position } from "../models/position.js";

export enum Status {
  InvalidCommand,
  ValidMove,
  Blocked,
  OutOfBound,
  Completed,
}

export type MovementStatus = {
  position: Position;
  status: Status;
};
