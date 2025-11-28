using Space.Models;
public class Program
{
    public static void Main(string[] args)
    {
        MarsRover marsRover = new MarsRover()
        {
            X_Position = 1,
            Y_Position = 2
        };
        int row = 5;
        int col = 5;
        Plateau plateau = new Plateau(row, col, marsRover);
        plateau.SyncGridWithMarsRover();
    }
}

