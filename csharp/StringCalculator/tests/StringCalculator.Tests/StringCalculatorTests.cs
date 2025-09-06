using FluentAssertions;

namespace StringCalculator.Tests;

public class StringCalculatorTests
{
    [Fact]
    public void EmptyString_Returns_Zero()
    {
        string EMPTY = "";
        int expected = 0;
        // arrange
        StringCalculator calculator = new StringCalculator();
        // act
        calculator.Add(EMPTY).Should().Be(expected);
    }

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

    [Theory]
    [InlineData("3\n3", 6)]
    [InlineData("3,\n3,3", 9)]
    public void Sums_With_Newline_Delimiter(string input, int expected)
    {
        // arrage 
        StringCalculator calculator = new StringCalculator();
        // act + assert
        calculator.Add(input).Should().Be(expected);
    }
}
