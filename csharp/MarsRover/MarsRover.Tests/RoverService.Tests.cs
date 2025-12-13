using Space.Helpers;
using Space.Models;
using Space.Services;
using FluentAssertions;

namespace Space.Tests;

public class RoverServiceTests
{
    [Fact]
    public void Giving_Wrong_Input_Will_Return_InvalidCommand()
    {
        // arrange
        RoverService service = new RoverService();
        int x = 0;
        int y = 0;
        MarsRover rover = new MarsRover(x, y);
        int height = 5;
        int width = 5;
        IReadOnlySet<Position> obstacles = new HashSet<Position>();
        Plateau plateau = new Plateau(height, width, obstacles);
        string commands = "lmx";
        // act
        var result = service.Execute(rover, plateau, commands);
        // assert
        result.Status.Should().Be(MoveStatus.InvalidCommand);
    }
}
