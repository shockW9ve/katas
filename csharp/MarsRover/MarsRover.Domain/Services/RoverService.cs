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
        // validate chars
        ValidateCommands(commands);
        // iterate chars
        IterateCommands(rover, commands);
        // apply movement policy
        position = new Position(position.x, position.y);
        plateau.TryStep(rover._position, rover.Heading, out position);

        // move
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
        foreach (char c in commands.ToUpper())
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

