using Space.Models;
using Space.Services;

public class Program
{
    public static void Main(string[] args)
    {
        int height = 5;
        int width = 5;
        IReadOnlySet<Position> obstacles = new HashSet<Position>();
        Plateau plateau = new Plateau(height: height, width: width, obstacles: obstacles);
        int x = 0;
        int y = 0;
        MarsRover rover = new MarsRover(x: x, y: y);
        RoverService service = new RoverService();
        string commands = "lm";
        var result = service.Execute(rover: rover, policy: plateau, commands: commands);
    }
}
