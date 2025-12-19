namespace Space.Helpers;

public class DirectionVectors
{
    public static (int dx, int dy) Delta(Direction direction)
    {
        switch (direction)
        {
            case Direction.North:
                return (0, 1);
            case Direction.East:
                return (1, 0);
            case Direction.South:
                return (0, -1);
            case Direction.West:
                return (-1, 0);
            default:
                throw new ArgumentException("Use a compass to move");
        }
    }
}
