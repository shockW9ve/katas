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
        // apply movement policy
        plateau.TryStep(rover._position, rover.Heading, out position);
        bool isBlocked = plateau.IsBlocked(position);
        if (isBlocked)
        {
            return;
        }
        // iterate chars
        // move
        IterateCommands(rover, caps);
    }

    public MoveOutCome Execute(MarsRover rover, IMovementPolicy policy, string commands)
    {
        // TODO
    }

    private bool IsValidCommands(string commands)
    {
        bool isValid = commands.Contains("LRM");
        if (isValid is false)
        {
            throw new ArgumentException("Not valid input");
        }
        return true;
    }

    private void IterateCommands(MarsRover rover, string commands)
    {
        foreach (char c in commands)
        {
            if (c.Equals('M'))
            {
                rover.MoveForward();
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

