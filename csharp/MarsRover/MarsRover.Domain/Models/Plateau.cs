namespace Space.Models;

public class Plateau
{
    MarsRover _marsRover;
    public int[,] grid;
    public int MarsRoverXCord { get; set; }
    public int MarsRoverYCord { get; set; }

    public Plateau(int row, int col, MarsRover marsRover)
    {
        grid = new int[row, col];
        _marsRover = marsRover;
    }

    public void SyncGridWithMarsRover()
    {
        MarsRoverYCord = _marsRover.Y_Position;
        MarsRoverXCord = _marsRover.X_Position;
        Draw();
    }

    public void Draw()
    {
        for (int i = 0; i < grid.GetLength(0); i++)
        {
            for (int j = 0; j < grid.GetLength(1); j++)
            {
                if (i == MarsRoverYCord && j == MarsRoverXCord)
                {
                    Console.Write(" # ");
                    continue;
                }
                Console.Write(" . ");
            }
            Console.WriteLine();
        }
    }
}
