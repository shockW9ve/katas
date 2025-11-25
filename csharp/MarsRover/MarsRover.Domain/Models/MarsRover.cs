using Space.Helpers;

namespace Space.Models;

public class MarsRover
{
    public required int X_Position { get; set; }
    public required int Y_Position { get; set; }
    public Enum Compas { get; set; } = Direction.North;

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

        // if (turn.Length < 1)
        // {
        //     return;
        // }

        foreach (char c in turn.ToUpper())
        {
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
}
