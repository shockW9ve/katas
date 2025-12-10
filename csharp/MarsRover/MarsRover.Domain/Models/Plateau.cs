using Space.Helpers;
using Space.Interfaces;

namespace Space.Models;

public class Plateau : IMovementPolicy
{

    public int Height { get; set; }
    public int Width { get; set; }
    public IReadOnlySet<Position> Obstacles;

    public Plateau(int height, int width, IReadOnlySet<Position> obstacles)
    {
        Height = height;
        Width = width;
        Obstacles = obstacles;
    }

    public bool TryStep(Position from, Direction direction, out Position to)
    {
        var (dx, dy) = DirectionVectors.Delta(direction);

        var candidate = (from.X + dx, from.Y + dy);

        if (candidate.Item1 >= Width || candidate.Item1 < 0 || candidate.Item2 >= Height || candidate.Item2 < 0)
        {
            to = from;
            return false;
        }

        to = new Position(candidate.Item1, candidate.Item2);

        return true;
    }

    public bool IsBlocked(Position position)
    {
        if (Obstacles.Contains(position))
        {
            return true;
        }

        return false;
    }

    // public void Draw()
    // {
    //     for (int i = 0; i < grid.GetLength(0); i++)
    //     {
    //         for (int j = 0; j < grid.GetLength(1); j++)
    //         {
    //             if (i == MarsRoverYCord && j == MarsRoverXCord)
    //             {
    //                 Console.Write(" @ ");
    //                 continue;
    //             }
    //
    //             if (i == ObstacleYCord && j == ObstacleXCord)
    //             {
    //                 Console.Write(" # ");
    //                 continue;
    //             }
    //             Console.Write(" . ");
    //         }
    //         Console.WriteLine();
    //     }
    // }
}
