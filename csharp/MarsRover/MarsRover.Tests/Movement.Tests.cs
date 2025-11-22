using Space.Models;
using FluentAssertions;

namespace Space.Tests;

public class MovementTests
{
    [Fact]
    public void Coordinates_Should_Return_Starting_Point()
    {
        // arrange
        var sut = new MarsRover()
        {
            X_Position = 0,
            Y_Position = 0
        };
        // act
        var result = sut.Report();

        // assert
        result.Should().Be("0 0 N");
        result.Should().NotBeEmpty();
    }

    [Fact]
    public void Turning_Should_Happen_In_90Degrees()
    {
        // arrange 
        var sut = new MarsRover()
        {
            Y_Position = 0,
            X_Position = 0
        };
        // act

        // assert

    }

}
