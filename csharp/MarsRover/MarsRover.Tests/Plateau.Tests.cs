using Space.Models;
using FluentAssertions;

namespace Space.Tests;

public class PlateauTests
{

    [Fact]
    public void Creating_Plateau_Should_Create_Grid()
    {
        // arrange
        int row = 5;
        int col = 5;
        MarsRover marsRover = new MarsRover()
        {
            X_Position = 0,
            Y_Position = 0
        };
        var sut = new Plateau(row, col, marsRover);
        // act

        // assert
        sut.grid.GetLength(0).Should().Be(5);
        sut.grid.GetLength(1).Should().Be(5);
    }
}
