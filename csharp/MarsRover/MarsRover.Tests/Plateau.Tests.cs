using Space.Helpers;
using Space.Models;
using FluentAssertions;

namespace Space.Tests;

public class PlateauTests
{
    [Fact]
    public void Creating_Plateau_Should_Create_Grid()
    {
        // arrange
        int x = 5;
        int y = 5;
        IReadOnlySet<Position> obstacles = new HashSet<Position>();
        var sut = new Plateau(x, y, obstacles);
        // act
        int xResult = sut.Width;
        int yResult = sut.Height;
        // assert
        xResult.Should().Be(x);
        yResult.Should().Be(y);
    }

    [Fact]
    public void Moving_To_An_Obstacle_Should_Block_Movement()
    {
        // arrange
        int x = 5;
        int y = 5;
        int xObstacle = 3;
        int yObstacle = 3;
        Position obstacle = new Position(xObstacle, yObstacle);
        IReadOnlySet<Position> obstacles = new HashSet<Position>() { obstacle };
        var sut = new Plateau(x, y, obstacles);
        int xPosition = 3;
        int yPosition = 3;
        Position position = new Position(xPosition, yPosition);
        // act
        var result = sut.IsBlocked(position);
        // assert
        result.Should().BeTrue();
    }

    [Fact]
    public void Moving_To_A_Border_Should_Return_Starting_Position()
    {
        // arrange
        int x = 5;
        int y = 5;
        int xObstacle = 3;
        int yObstacle = 3;
        Position obstacle = new Position(xObstacle, yObstacle);
        IReadOnlySet<Position> obstacles = new HashSet<Position>() { obstacle };
        var sut = new Plateau(x, y, obstacles);
        int xFrom = 4;
        int yFrom = 4;
        Position from = new Position(xFrom, yFrom);
        Position to;
        // act
        var result = sut.TryStep(from, Direction.North, out to);
        // assert
        result.Should().BeFalse();
        to.X.Should().Be(from.X);
        to.Y.Should().Be(from.Y);
    }
}
