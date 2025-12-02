using Space.Helpers;
using Space.Interfaces;
using Space.Models;
using Space.ValueObjects;

namespace Space.Controllers;

public class RoverController
{
    Position position;
    public void Execute(MarsRover rover, Plateau plateau, string commands)
    {
        // validate chars
        ValidateCommands(commands);
        // iterate chars
        IterateCommands(rover, commands);
        // apply movement policy
        plateau.TryStep(rover._position, rover.Compass, out position);
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
                Move();
                continue;
            }

            switch (rover.Compass)
            {
                case Direction.North:
                    if (c.Equals('L'))
                    {
                        rover.Compass = Direction.West;
                    }
                    if (c.Equals('R'))
                    {
                        rover.Compass = Direction.East;
                    }
                    break;

                case Direction.East:
                    if (c.Equals('L'))
                    {
                        rover.Compass = Direction.North;
                    }
                    if (c.Equals('R'))
                    {
                        rover.Compass = Direction.South;
                    }
                    break;

                case Direction.South:
                    if (c.Equals('L'))
                    {
                        rover.Compass = Direction.East;
                    }
                    if (c.Equals('R'))
                    {
                        rover.Compass = Direction.West;
                    }
                    break;

                case Direction.West:
                    if (c.Equals('L'))
                    {
                        rover.Compass = Direction.South;
                    }
                    if (c.Equals('R'))
                    {
                        rover.Compass = Direction.North;
                    }
                    break;

                default:
                    throw new ArgumentException("Wrong input");
            }
        }
    }
}

