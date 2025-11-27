namespace Space.Models;

public class Plateau
{
    MarsRover _marsRover;
    public int[,] grid;
    public Plateau(int row, int col, MarsRover marsRover)
    {
        grid = new int[row, col];
        _marsRover = marsRover;
    }
    // MarsRover marsRover = new MarsRover()
    // {
    //     X_Position = 0,
    //     Y_Position = 0
    // };
    //
    // int X_Position { get; set; } = 4;
    // int Y_Position { get; set; } = 4;
    //
    // public void Draw()
    // {
    //     for (int i = 0; i < Y_Position; i++)
    //     {
    //         for (int j = 0; j < X_Position; j++)
    //         {
    //             Console.Write(" . ");
    //         }
    //         Console.WriteLine();
    //     }
    // }
}
