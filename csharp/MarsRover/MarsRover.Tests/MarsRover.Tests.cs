using Space.Models;
using Space.Helpers;
using FluentAssertions;

namespace Space.Tests;

public class MarsRoverTests
{
    [Fact]
    public void Coordinates_Should_Return_Starting_Point()
    {
        // arrange
        var sut = new MarsRover(0, 0);
        // act
        var result = sut.Report();
        // assert
        result.Should().Be("0 0 North");
        result.Should().NotBeEmpty();
    }

    [Fact]
    public void Turning_Left_Should_Happen_In_90Degrees()
    {
        // arrange 
        var sut = new MarsRover(0, 0);
        // act
        sut.TurnLeft();
        var result = sut.Heading;
        // assert
        result.Should().Be(Direction.West);
    }

    [Fact]
    public void Turning_Right_Should_Happen_In_90Degrees()
    {
        // arrange 
        var sut = new MarsRover(0, 0);
        // act
        sut.TurnRight();
        var result = sut.Heading;
        // assert
        result.Should().Be(Direction.East);
    }

    [Fact]
    public void Advancing_To_A_New_Position_Should_Reflect_In_Rover_Coordinate()
    {
        // arrange 
        var sut = new MarsRover(0, 0);
        Position to = new Position(1, 0);
        // act
        sut.AdvanceTo(to);
        // assert
        sut.Position.X.Should().Be(1);
        sut.Position.Y.Should().Be(0);
    }
}
