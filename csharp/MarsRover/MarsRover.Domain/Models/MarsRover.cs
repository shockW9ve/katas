using Space.Helpers;

namespace Space.Models;

public class MarsRover
{
    public Direction Heading { get; private set; } = Direction.North;
    public Position Position { get; private set; }
    public MoveStatus Status { get; private set; }

    public MarsRover(int x, int y)
    {
        Position = new Position(x, y);
    }

    public string Report()
    {
        return $"{Position.X} {Position.Y} {Heading}";
    }

    public void TurnRight()
    {
        Heading = DirectionExtension.RotateRight(Heading);
    }

    public void TurnLeft()
    {
        Heading = DirectionExtension.RotateLeft(Heading);
    }

    public void MoveForward(Position position)
    {
        Position = Position with { X = position.X, Y = position.Y };
    }
}
