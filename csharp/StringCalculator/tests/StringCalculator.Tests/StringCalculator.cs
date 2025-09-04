using FluentAssertions;

namespace StringCalculator.Tests;

public class UnitTest1
{
    [Theory]
    [InlineData("3,6", 9)]
    [InlineData("3,6,9", 18)]
    public void Sums_CommaSeperated_Numbers(string input, int expected)
    {
        // arrange
        StringCalculator calculator = new StringCalculator();
        // act + assert
        calculator.Add(input).Should().Be(expected);
    }
}
