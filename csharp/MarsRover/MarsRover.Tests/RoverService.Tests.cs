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

    [Fact]
    public void Giving_Only_Turn_Directions_Should_Execute_And_Return_Completed()
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
        string commands = "lrlr";
        // act
        var result = service.Execute(rover, plateau, commands);
        // assert
        result.Status.Should().Be(MoveStatus.Completed);
    }

    [Fact]
    public void Giving_Several_Commands_Should_Execute_And_Return_Completed()
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
        string commands = "mrmmll";
        // act
        var result = service.Execute(rover, plateau, commands);
        // assert
        result.Status.Should().Be(MoveStatus.Completed);
        rover.Heading.Should().Be(Direction.West);
        rover.Position.X.Should().Be(2);
        rover.Position.Y.Should().Be(1);
    }

    [Fact]
    public void When_Moving_OutOfBound_Should_Return_OutOfBound_And_Last_Postion()
    {
        // arrange
        RoverService service = new RoverService();
        int x = 3;
        int y = 3;
        MarsRover rover = new MarsRover(x, y);
        int height = 5;
        int width = 5;
        IReadOnlySet<Position> obstacles = new HashSet<Position>();
        Plateau plateau = new Plateau(height, width, obstacles);
        string commands = "mm";
        // act
        var result = service.Execute(rover, plateau, commands);
        // assert
        result.Status.Should().Be(MoveStatus.OutOfBounds);
        rover.Heading.Should().Be(Direction.North);
        rover.Position.X.Should().Be(3);
        rover.Position.Y.Should().Be(4);
    }

    [Fact]
    public void When_Moving_To_An_Obstacle_Should_Return_Blocked_And_From_Position()
    {
        // arrange
        int xObstacle = 3;
        int yObstacle = 3;
        Position obstacle = new Position(xObstacle, yObstacle);
        IReadOnlySet<Position> obstacles = new HashSet<Position>() { obstacle };
        RoverService service = new RoverService();
        int x = 2;
        int y = 3;
        MarsRover rover = new MarsRover(x, y);
        int height = 5;
        int width = 5;
        Plateau plateau = new Plateau(height, width, obstacles);
        string commands = "rm";
        // act
        var result = service.Execute(rover, plateau, commands);
        // assert
        result.Status.Should().Be(MoveStatus.Blocked);
        rover.Heading.Should().Be(Direction.East);
        rover.Position.X.Should().Be(2);
        rover.Position.Y.Should().Be(3);
    }

}
