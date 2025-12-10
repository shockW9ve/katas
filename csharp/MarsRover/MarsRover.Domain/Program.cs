using Space.Models;
using Space.Helpers;
using Space.Services;

public class Program
{
    public static void Main(string[] args)
    {
        int height = 5;
        int width = 5;
        IReadOnlyList<Position> obstacles = new List<Position>();
        Plateau plateau = new Plateau();
        int x = 0;
        int y = 0;
        MarsRover rover = new MarsRover();
        RoverService service = new RoverService();
    }
}

