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

    [Fact]
    public void Negative_Numbers_Throws_ArgumentException()
    {
        // arrange 
        StringCalculator calculator = new StringCalculator();
        // act + assert
        // assert version
        // Assert.Throws<ArgumentException>(() => calculator.Add("-3,6"));
        // fluent assertion method
        Action action = () => calculator.Add("-3,6");
        action.Should().Throw<ArgumentException>().WithMessage("Negative numbers are not allowed: -3");
    }

    [Fact]
    public void Negative_Numbers_Throws_With_Numbers_List()
    {
        // arrange 
        StringCalculator calculator = new StringCalculator();
        string input = "3,-6,-9";
        // act + assert
        Action action = () => calculator.Add(input);
        action.Should().Throw<ArgumentException>().WithMessage("Negative numbers are not allowed: -6,-9");
    }

    [Theory]
    [InlineData("3,6", 9)]
    [InlineData("3,6,9", 18)]
    [InlineData("3,1001,6,9", 18)]
    public void Sums_CommaSeparated_Numbers(string input, int expected)
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

    [Theory]
    [InlineData("//;\n9;9", 18)]
    [InlineData("//;\n9;9;9", 27)]
    public void Uses_Custom_SingleChar_Delimiter(string input, int expected)
    {
        // arrange
        StringCalculator calculator = new StringCalculator();
        // act + assert
        calculator.Add(input).Should().Be(expected);
    }

    [Fact]
    public void Adjecent_Delimiter_Do_Not_Crash()
    {
        // arrange
        StringCalculator calculator = new StringCalculator();
        string input = "1,\n2,3";
        int expected = 6;
        // act + assert
        calculator.Add(input).Should().Be(expected);
    }


}
