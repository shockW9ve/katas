using Space.Helpers;
using Space.Interfaces;
using Space.ValueObjects;

namespace Space.Models;

public class Plateau : IMovementPolicy
{

    public int Height { get; set; }
    public int Width { get; set; }
    public IReadOnlySet<Position> Obstacles;


    public void TryStep(Position from, Direction direction, out Position to)
    { }

    // Obstacle _obstacle;
    // MarsRover _marsRover;
    // public int[,] grid;
    // public int MarsRoverXCord { get; set; }
    // public int MarsRoverYCord { get; set; }
    // public int ObstacleXCord { get; set; }
    // public int ObstacleYCord { get; set; }
    // public int UpperXLimit { get; set; }
    // public int LowerXLimit { get; set; }
    // public int UpperYLimit { get; set; }
    // public int LowerYLimit { get; set; }
    //
    // public Plateau(int row, int col, MarsRover marsRover, Obstacle obstacle)
    // {
    //     grid = new int[row, col];
    //     _marsRover = marsRover;
    //     _obstacle = obstacle;
    //     GridLimits(row, col);
    //     ObstacleXCord = _obstacle.XCoordinate;
    //     ObstacleYCord = _obstacle.YCoordinate;
    // }


    // private void GridLimits(int row, int col)
    // {
    //     UpperXLimit = col + 1;
    //     LowerXLimit = -1;
    //     UpperYLimit = row + 1;
    //     LowerYLimit = -1;
    // }
    //
    // public void SyncGridWithMarsRover()
    // {
    //     MarsRoverYCord = _marsRover.Y_Position;
    //     MarsRoverXCord = _marsRover.X_Position;
    //
    //     if (MarsRoverXCord >= UpperXLimit)
    //     {
    //         _marsRover.X_Position = 0;
    //         MarsRoverXCord = _marsRover.X_Position;
    //     }
    //     if (MarsRoverXCord <= LowerXLimit)
    //     {
    //         _marsRover.X_Position = UpperXLimit - 1;
    //         MarsRoverXCord = _marsRover.X_Position;
    //     }
    //     if (MarsRoverYCord >= UpperYLimit)
    //     {
    //         _marsRover.Y_Position = 0;
    //         MarsRoverYCord = _marsRover.Y_Position;
    //     }
    //     if (MarsRoverYCord <= LowerYLimit)
    //     {
    //         _marsRover.Y_Position = UpperYLimit - 1;
    //         MarsRoverYCord = _marsRover.Y_Position;
    //     }
    //
    //     // Draw();
    // }
    //
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
