using Space.Interfaces;
using Space.Helpers;
using Space.Models;

namespace Space.Services;

public sealed class RoverService
{
    Position position;

    public void Execute(MarsRover rover, Plateau plateau, string commands)
    {
        string caps = commands.Trim().ToUpper();
        // validate chars
        bool isValid = IsValidCommands(caps);
        if (isValid is false)
        {
            // rover.RoverStatus(MoveStatus.InvalidCommand);
            MoveOutcome moveOutcome = new MoveOutcome(MoveStatus.InvalidCommand);
            return;
        }
        // apply movement policy
        // Execute(rover, plateau, caps);
        // var isOutOfBound = plateau.TryStep(rover.Position, rover.Heading, out position);
        // if (isOutOfBound)
        // {
        //     rover.RoverStatus(MoveStatus.OutOfBounds);
        //     return;
        // }
        //
        // bool isBlocked = plateau.IsBlocked(position);
        // if (isBlocked)
        // {
        //     rover.RoverStatus(MoveStatus.Blocked);
        //     return;
        // }
        // iterate chars
        // move

        IterateCommands(rover, plateau, caps, position);
    }

    public MoveOutcome TryStep(IMovementPolicy policy, MarsRover rover)
    {
        var isOutOfBound = policy.TryStep(rover.Position, rover.Heading, out position);

        if (isOutOfBound)
        {
            return new MoveOutcome(MoveStatus.OutOfBounds, position);
        }


        bool isBlocked = policy.IsBlocked(position);
        if (isBlocked)
        {
            return new MoveOutcome(MoveStatus.Blocked, position);
        }

        rover.MoveForward(position);

        return new MoveOutcome(MoveStatus.Completed, position);
    }

    private bool IsValidCommands(string commands)
    {
        bool isValid = true;
        foreach (char c in commands)
        {
            if (c.Equals('L') is false || c.Equals('R') is false || c.Equals('M') is false)
            {
                isValid = false;
                return isValid;
            }
        }
        return isValid;
    }

    private void IterateCommands(MarsRover rover, IMovementPolicy policy, string commands, Position position)
    {
        // uint incedent = 0;
        foreach (char c in commands)
        {
            if (c.Equals('M'))
            {
                MoveOutcome outcome = TryStep(policy, rover);
                if (outcome.Status != MoveStatus.Completed)
                {
                    break;
                }
                // rover.MoveForward(position);

                // var isOutOfBound = policy.TryStep(rover.Position, rover.Heading, out position);
                // if (isOutOfBound)
                // {
                //     rover.RoverStatus(MoveStatus.OutOfBounds);
                //     incedent++;
                //     break;
                // }
                //
                // bool isBlocked = policy.IsBlocked(position);
                // if (isBlocked)
                // {
                //     rover.RoverStatus(MoveStatus.Blocked);
                //     incedent++;
                //     break;
                // }
                //
                // rover.MoveForward(position);
            }

            if (c.Equals('L'))
            {
                rover.TurnLeft();
            }

            if (c.Equals('R'))
            {
                rover.TurnRight();
            }
        }

        // if (incedent < 0)
        // {
        //     rover.RoverStatus(MoveStatus.Completed);
        // }
    }
}
