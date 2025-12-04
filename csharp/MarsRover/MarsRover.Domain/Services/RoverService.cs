using Space.Helpers;
using Space.Interfaces;
using Space.Models;
using Space.ValueObjects;

namespace Space.Services;

public class RoverService
{
    Position position;
    public void Execute(MarsRover rover, Plateau plateau, string commands)
    {
        string caps = commands.ToUpper();
        // validate chars
        ValidateCommands(caps);
        // iterate chars
        IterateCommands(rover, caps);
        // apply movement policy
        plateau.TryStep(rover._position, rover.Heading, out position);

        bool IsBlocked = plateau.IsBlocked(position);
        // move
        if (IsBlocked)
        {
            return;
        }

        rover.MoveForward();
    }

    private void ValidateCommands(string commands)
    {
        bool isValid = commands.Contains("LRM");
        if (isValid is false)
        {
            throw new ArgumentException("Not valid input");
        }
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

