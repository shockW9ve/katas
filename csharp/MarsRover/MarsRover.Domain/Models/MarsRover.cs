using Space.Helpers;
using Space.ValueObjects;

namespace Space.Models;

public class MarsRover
{
    public required int X_Position { get; set; }
    public required int Y_Position { get; set; }
    public Direction Compass { get; set; } = Direction.North;
    public Position postion;

    public string Report()
    {
        return $"{X_Position} {Y_Position} {Compas.ToString().Substring(0, 1)}";
    }

    public void Turn(string turn)
    {
        if (turn is null)
        {
            throw new ArgumentException("Invalid input");
        }

        foreach (char c in turn.ToUpper())
        {
            if (c.Equals('M'))
            {
                Move();
                continue;
            }

            switch (Compas)
            {
                case Direction.North:
                    if (c.Equals('L'))
                    {
                        Compas = Direction.West;
                    }
                    else
                    {
                        Compas = Direction.East;
                    }
                    break;

                case Direction.East:
                    if (c.Equals('L'))
                    {
                        Compas = Direction.North;
                    }
                    else
                    {
                        Compas = Direction.South;
                    }
                    break;

                case Direction.South:
                    if (c.Equals('L'))
                    {
                        Compas = Direction.East;
                    }
                    else
                    {
                        Compas = Direction.West;
                    }
                    break;

                case Direction.West:
                    if (c.Equals('L'))
                    {
                        Compas = Direction.South;
                    }
                    else
                    {
                        Compas = Direction.North;
                    }
                    break;

                default:
                    Console.WriteLine("Wrong direction input");
                    break;
            }
        }
    }

    public void Move()
    {
        if (Compas is Direction.North)
        {
            Y_Position++;
        }

        if (Compas is Direction.East)
        {
            X_Position++;
        }

        if (Compas is Direction.South)
        {
            Y_Position--;
        }

        if (Compas is Direction.West)
        {
            X_Position--;
        }
    }
}

