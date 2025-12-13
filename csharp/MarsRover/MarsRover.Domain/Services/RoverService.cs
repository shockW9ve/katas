using System.Diagnostics;
using Space.Interfaces;
using Space.Helpers;
using Space.Models;

namespace Space.Services;

public sealed class RoverService
{
    public MoveOutcome Execute(MarsRover rover, IMovementPolicy policy, string commands)
    {
        string commandsToUpperCase = commands?.Trim().ToUpperInvariant() ?? string.Empty;
        // validate commands
        if (!IsValidCommands(commandsToUpperCase))
        {
            return new MoveOutcome(MoveStatus.InvalidCommand);
        }
        // iterate commands & move
        return IterateCommands(rover, policy, commandsToUpperCase);
    }

    private bool IsValidCommands(string commands)
    {
        foreach (char c in commands)
        {
            if (c != 'L' && c != 'R' && c != 'M')
            {
                return false;
            }
        }
        return true;
    }

    private MoveOutcome IterateCommands(MarsRover rover, IMovementPolicy policy, string commands)
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

                    if (!canStep)
                    {
                        return new MoveOutcome(MoveStatus.OutOfBounds, rover.Position);
                    }

                    bool isBlocked = policy.IsBlocked(next);
                    if (isBlocked)
                    {
                        return new MoveOutcome(MoveStatus.Blocked, next);
                    }

                    rover.AdvanceTo(next);
                    break;
                default:
                    Debug.Assert(rover != null, "MarsRover is missing");
                    break;
            }
        }
        return new MoveOutcome(MoveStatus.Completed, rover.Position);
    }
}
