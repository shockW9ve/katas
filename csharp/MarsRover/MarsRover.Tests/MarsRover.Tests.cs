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
    public void Turning_Should_Happen_In_90Degrees()
    {
        // arrange 
        var sut = new MarsRover(0, 0);
        // act
        sut.TurnLeft();
        var result = sut.Heading;
        // assert
        result.Should().Be(Direction.West);
    }
    //
    //
    // [Fact]
    // public void Turning_Twice_In_Same_Direction_Should_Happen_In_180Degrees()
    // {
    //     // arrange 
    //     var sut = new MarsRover()
    //     {
    //         Y_Position = 0,
    //         X_Position = 0
    //     };
    //
    //     string direction = "ll";
    //     // act
    //     sut.Turn(direction);
    //     var result = sut.Compas;
    //     // assert
    //     result.Should().Be(Direction.South);
    // }
    //
    // [Fact]
    // public void Turning_Trice_In_Same_Direction_Should_Happen_In_270Degrees()
    // {
    //     // arrange 
    //     var sut = new MarsRover()
    //     {
    //         Y_Position = 0,
    //         X_Position = 0
    //     };
    //
    //     string direction = "rrr";
    //     // act
    //     sut.Turn(direction);
    //     var result = sut.Compas;
    //     // assert
    //     result.Should().Be(Direction.West);
    // }
    //
    [Fact]
    public void Moving_Forward_When_Facing_North_Should_Plus_Y_With_One()
    {
        // arrange 
        var sut = new MarsRover(0, 0);
        Position position = new Position(0, 1);
        //act
        sut.AdvanceTo(position);
        int x = sut.Position.X;
        int y = sut.Position.Y;
        var direction = sut.Heading;
        // assert
        x.Should().Be(0);
        y.Should().Be(1);
        direction.Should().Be(Direction.North);
    }
    //
    // [Fact]
    // public void Moving_Forward_When_Facing_East_Should_Plus_X_With_One()
    // {
    //     // arrange 
    //     var sut = new MarsRover()
    //     {
    //         Y_Position = 1,
    //         X_Position = 1,
    //         Compas = Direction.East
    //     };
    //
    //     string move = "m";
    //     //act
    //     sut.Turn(move);
    //     int y = sut.Y_Position;
    //     int x = sut.X_Position;
    //     var direction = sut.Compas;
    //     // assert
    //     y.Should().Be(1);
    //     x.Should().Be(2);
    //     direction.Should().Be(Direction.East);
    // }
    //
    // [Fact]
    // public void Moving_With_Several_Movement_And_Directions_Should_Not_Crash()
    // {
    //     // arrange 
    //     var sut = new MarsRover()
    //     {
    //         Y_Position = 2,
    //         X_Position = 1,
    //     };
    //
    //     string move = "LMLMLMLMM";
    //     // 1,2,n
    //     //     0,2,w
    //     //     0,1,s
    //     //     1,1,e
    //     //     1,3,n
    //     //act
    //     sut.Turn(move);
    //     int y = sut.Y_Position;
    //     int x = sut.X_Position;
    //     var direction = sut.Compas;
    //     // assert
    //     y.Should().Be(3);
    //     x.Should().Be(1);
    //     direction.Should().Be(Direction.North);
    // }
}
