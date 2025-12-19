namespace Space.Helpers;

public class DirectionExtension
{
    public static Direction RotateRight(Direction direction)
    {
        switch (direction)
        {
            case Direction.North:
                return Direction.East;
            case Direction.East:
                return Direction.South;
            case Direction.South:
                return Direction.West;
            case Direction.West:
                return Direction.North;
            default:
                throw new ArgumentException("Use a compass to move");
        }
    }

    public static Direction RotateLeft(Direction direction)
    {
        switch (direction)
        {
            case Direction.North:
                return Direction.West;
            case Direction.East:
                return Direction.North;
            case Direction.South:
                return Direction.East;
            case Direction.West:
                return Direction.South;
            default:
                throw new ArgumentException("Use a compass to move");
        }
    }
}
