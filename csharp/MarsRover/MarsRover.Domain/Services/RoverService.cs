using Space.Interfaces;
using Space.Helpers;
using Space.Models;

namespace Space.Services;

public sealed class RoverService
{
    Position position;
    public void Execute(MarsRover rover, Plateau plateau, string commands)
    {
        string caps = commands.ToUpper();
        // validate chars
        bool isValid = IsValidCommands(caps);
        if (isValid is false)
        {
            rover.RoverStatus(MoveStatus.InvalidCommand);
            return;
        }
        // apply movement policy
        var isOutOfBound = plateau.TryStep(rover.Position, rover.Heading, out position);
        if (isOutOfBound)
        {
            rover.RoverStatus(MoveStatus.OutOfBounds);
        }

        bool isBlocked = plateau.IsBlocked(position);
        if (isBlocked)
        {
            rover.RoverStatus(MoveStatus.Blocked);
            return;
        }
        // iterate chars
        // move
        IterateCommands(rover, caps, position);
        rover.RoverStatus(MoveStatus.Completed);
    }

    // public MoveOutCome Execute(MarsRover rover, IMovementPolicy policy, string commands)
    // {
    //     policy.TryStep()
    // }

    private bool IsValidCommands(string commands)
    {
        bool isValid = false;
        foreach (char c in commands)
        {
            if (c.Equals('L') || c.Equals('R') || c.Equals('M'))
            {
                isValid = true;
            }
        }
        return isValid;
    }

    private void IterateCommands(MarsRover rover, string commands, Position position)
    {
        foreach (char c in commands)
        {
            if (c.Equals('M'))
            {
                rover.MoveForward(position);
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
    }
}

