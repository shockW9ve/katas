using Space.Models;
using Space.Helpers;
public class Program
{
    public static void Main(string[] args)
    {
        MarsRover rover = new MarsRover(0, 0);
        rover.Heading = Direction.West;
        int convert = (int)rover.Heading + 10;
        Console.WriteLine("convert: " + convert);
        int mod = 10;
        int first = convert % mod;
        Console.WriteLine("first: " + first);
        int second = (convert + 1) % mod;
        Console.WriteLine("second: " + second);
        int result = (first + second) % mod;
        Console.WriteLine(result);
        // Random random = new Random();
        // int x = random.Next(0, 5);
        // int y = random.Next(0, 5);
        // Obstacle obstacle = new Obstacle(y, x);
        // MarsRover marsRover = new MarsRover()
        // {
        //     X_Position = 1,
        //     Y_Position = 2
        // };
        // int row = 5;
        // int col = 5;
        // Plateau plateau = new Plateau(row, col, marsRover, obstacle);
        // plateau.SyncGridWithMarsRover();
    }

    void TurnRight() { }
}

