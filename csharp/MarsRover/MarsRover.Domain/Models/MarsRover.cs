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

    public void Turn(Direction direction)
    {
        switch (direction)
        {
            case Direction.North:
                break;

            case Direction.East:
                break;

            case Direction.South:
                break;

            case Direction.West:
                break;

            default:
                break;
        }
    }
}
