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
    //
    // [Fact]
    // public void Creating_Plateau_Should_Sync_Grid_With_Mars_Rover_Coordinates()
    // {
    //     // arrange
    //     MarsRover marsRover = new MarsRover()
    //     {
    //         X_Position = 1,
    //         Y_Position = 2
    //     };
    //     int row = 5;
    //     int col = 5;
    //     // act
    //     Plateau plateau = new Plateau(row, col, marsRover);
    //     plateau.SyncGridWithMarsRover();
    //     // assert
    //     plateau.MarsRoverXCord.Should().Be(marsRover.X_Position);
    //     plateau.MarsRoverYCord.Should().Be(marsRover.Y_Position);
    // }
    //
    // [Fact]
    // public void Hitting_Grid_X_Coordinate_Limit_Should_Return_Mars_Rover_To_Lower_Limit()
    // {
    //     // arrange
    //     MarsRover marsRover = new MarsRover()
    //     {
    //         X_Position = 5,
    //         Y_Position = 2
    //     };
    //     int row = 5;
    //     int col = 5;
    //     string movement = "rm";
    //     // act
    //     Plateau plateau = new Plateau(row, col, marsRover);
    //     marsRover.Turn(movement);
    //     plateau.SyncGridWithMarsRover();
    //     // assert
    //     plateau.MarsRoverXCord.Should().Be(0);
    //     plateau.MarsRoverYCord.Should().Be(2);
    //     marsRover.X_Position.Should().Be(0);
    //     marsRover.Y_Position.Should().Be(2);
    //     marsRover.Compas.Should().Be(Direction.East);
    // }
    //
    // [Fact]
    // public void Hitting_Grid_X_Coordinate_Lower_Limit_Should_Return_Mars_Rover_To_Upper_Limit()
    // {
    //     // arrange
    //     MarsRover marsRover = new MarsRover()
    //     {
    //         X_Position = 0,
    //         Y_Position = 2
    //     };
    //     int row = 5;
    //     int col = 5;
    //     string movement = "lm";
    //     // act
    //     Plateau plateau = new Plateau(row, col, marsRover);
    //     marsRover.Turn(movement);
    //     plateau.SyncGridWithMarsRover();
    //     // assert
    //     plateau.MarsRoverXCord.Should().Be(5);
    //     plateau.MarsRoverYCord.Should().Be(2);
    //     marsRover.X_Position.Should().Be(5);
    //     marsRover.Y_Position.Should().Be(2);
    //     marsRover.Compas.Should().Be(Direction.West);
    // }
    //
    // [Fact]
    // public void Hitting_Grid_Y_Coordinate_Limit_Should_Return_Mars_Rover_To_Lower_Limit()
    // {
    //     // arrange
    //     MarsRover marsRover = new MarsRover()
    //     {
    //         X_Position = 3,
    //         Y_Position = 5
    //     };
    //     int row = 5;
    //     int col = 5;
    //     string movement = "m";
    //     // act
    //     Plateau plateau = new Plateau(row, col, marsRover);
    //     marsRover.Turn(movement);
    //     plateau.SyncGridWithMarsRover();
    //     // assert
    //     plateau.MarsRoverXCord.Should().Be(3);
    //     plateau.MarsRoverYCord.Should().Be(0);
    //     marsRover.X_Position.Should().Be(3);
    //     marsRover.Y_Position.Should().Be(0);
    //     marsRover.Compas.Should().Be(Direction.North);
    // }
    //
    // [Fact]
    // public void Hitting_Grid_Y_Coordinate_Lower_Limit_Should_Return_Mars_Rover_To_Upper_Limit()
    // {
    //     // arrange
    //     MarsRover marsRover = new MarsRover()
    //     {
    //         X_Position = 3,
    //         Y_Position = 0
    //     };
    //     int row = 5;
    //     int col = 5;
    //     string movement = "llm";
    //     // act
    //     Plateau plateau = new Plateau(row, col, marsRover);
    //     marsRover.Turn(movement);
    //     plateau.SyncGridWithMarsRover();
    //     // assert
    //     plateau.MarsRoverXCord.Should().Be(3);
    //     plateau.MarsRoverYCord.Should().Be(5);
    //     marsRover.X_Position.Should().Be(3);
    //     marsRover.Y_Position.Should().Be(5);
    //     marsRover.Compas.Should().Be(Direction.South);
    // }
}
