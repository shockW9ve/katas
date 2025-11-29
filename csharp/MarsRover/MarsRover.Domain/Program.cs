using Space.Models;
public class Program
{
    public static void Main(string[] args)
    {
        Random random = new Random();
        int x = random.Next(0, 5);
        int y = random.Next(0, 5);
        Obstacle obstacle = new Obstacle(y, x);
        MarsRover marsRover = new MarsRover()
        {
            X_Position = 1,
            Y_Position = 2
        };
        int row = 5;
        int col = 5;
        Plateau plateau = new Plateau(row, col, marsRover, obstacle);
        plateau.SyncGridWithMarsRover();
    }
}

