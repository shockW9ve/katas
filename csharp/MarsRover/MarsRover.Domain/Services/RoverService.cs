using Space.Interfaces;
using Space.Helpers;
using Space.Models;

namespace Space.Services;

public sealed class RoverService
{
    public MoveOutcome Execute(MarsRover rover, IMovementPolicy policy, string commands)
    {
        string caps = commands?.Trim().ToUpperInvariant() ?? string.Empty;
        // validate commands
        if (IsValidCommands(caps) is false)
        {
            return new MoveOutcome(MoveStatus.InvalidCommand);
        }
        // iterate commands & move
        return IterateCommands(rover, policy, caps);
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

                    if (canStep is false)
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
            }
        }
        return new MoveOutcome(MoveStatus.Completed, rover.Position);
    }
}
