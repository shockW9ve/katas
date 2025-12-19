using FluentAssertions;
using Space.Helpers;
using Space.Models;

public class StepDeltaTests
{
    private static Plateau World() =>
        new Plateau(height: 10, width: 10, obstacles: new HashSet<Position>());

    [Theory]
    [InlineData(5, 5, Direction.North, 5, 6)]
    [InlineData(5, 5, Direction.East, 6, 5)]
    [InlineData(5, 5, Direction.South, 5, 4)]
    [InlineData(5, 5, Direction.West, 4, 5)]
    public void TryStep_ComputesNextCell_FromHeading(int x, int y, Direction dir, int ex, int ey)
    {
        var plateau = World();
        plateau.TryStep(new Position(x, y), dir, out var to).Should().BeTrue();
        to.Should().Be(new Position(ex, ey));
    }
}
