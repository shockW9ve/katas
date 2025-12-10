using Space.Interfaces;
using Space.Helpers;
using Space.Models;

namespace Space.Services;

public sealed class RoverService
{
    private Position position;
    private List<MoveOutcome> outcomes = new List<MoveOutcome>();

    public List<MoveOutcome> Execute(MarsRover rover, Plateau plateau, string commands)
    {
        string caps = commands.Trim().ToUpper();
        // validate commands
        bool isValid = IsValidCommands(caps);
        if (isValid is false)
        {
            outcomes.Add(new MoveOutcome(MoveStatus.InvalidCommand));
            return outcomes;
        }
        // iterate commands & move
        IterateCommands(rover, plateau, caps, position);

        return outcomes;
    }

    private MoveOutcome TryStep(IMovementPolicy policy, MarsRover rover)
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
        foreach (char c in commands)
        {
            if (c.Equals('L') is false && c.Equals('R') is false && c.Equals('M') is false)
            {
                return false;
            }
        }
        return true;
    }

    private void IterateCommands(MarsRover rover, IMovementPolicy policy, string commands, Position position)
    {
        foreach (char c in commands)
        {
            if (c.Equals('M'))
            {
                MoveOutcome outcome = TryStep(policy, rover);
                outcomes.Add(outcome);

                if (outcome.Status != MoveStatus.Completed)
                {
                    break;
                }
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
