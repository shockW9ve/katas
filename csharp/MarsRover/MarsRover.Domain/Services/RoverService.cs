using Space.Interfaces;
using Space.Helpers;
using Space.Models;

namespace Space.Services;

public sealed class RoverService
{
    public MoveOutcome Execute(MarsRover rover, Plateau plateau, string commands)
    {
        Position next = rover.Position;
        string caps = commands.Trim().ToUpper();
        // validate commands
        bool isValid = IsValidCommands(caps);
        if (isValid is false)
        {
            return new MoveOutcome(MoveStatus.InvalidCommand);
        }
        // iterate commands & move
        MoveOutcome outcome = IterateCommands(rover, plateau, caps, next);
        return outcome;
    }

    private bool IsValidCommands(string commands)
    {
        foreach (char c in commands)
        {
            if (c.Equals('L') is false && c.Equals('R') is false && c.Equals('M') is false)
            {
                return false;
            }
        }
        return true;
    }

    private MoveOutcome IterateCommands(
        MarsRover rover,
        IMovementPolicy policy,
        string commands,
        Position position)
    {
        foreach (char c in commands)
        {
            switch (c)
            {
                case 'L':
                    rover.TurnLeft();
                    break;
                case 'R':
                    rover.TurnRight();
                    break;
                case 'M':
                    Position next;
                    var canStep = policy.TryStep(rover.Position, rover.Heading, out next);

                    if (canStep is false)
                    {
                        return new MoveOutcome(MoveStatus.OutOfBounds, next);
                    }


                    bool isBlocked = policy.IsBlocked(next);
                    if (isBlocked)
                    {
                        return new MoveOutcome(MoveStatus.Blocked, next);
                    }

                    rover.AdvanceTo(next);
                    break;
                default:
                    break;
            }

            return new MoveOutcome(MoveStatus.Completed, position);
        }
    }
}
