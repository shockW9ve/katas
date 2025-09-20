using FluentAssertions;

namespace StringCalculator.Tests;

public class StringCalculatorTests
{
    private readonly StringCalculator _sut = new StringCalculator();

    [Fact]
    public void EmptyString_Returns_Zero()
    {
        // arrange
        string EMPTY = "";
        int expected = 0;
        // act
        _sut.Add(EMPTY).Should().Be(expected);
    }

    [Fact]
    public void Negative_Numbers_Throws_ArgumentException()
    {
        // arrange 
        // act + assert
        // assert version
        // Assert.Throws<ArgumentException>(() => calculator.Add("-3,6"));
        // fluent assertion method
        Action action = () => _sut.Add("-3,6");
        action.Should().Throw<ArgumentException>().WithMessage("*Negative numbers*");
    }

    [Fact]
    public void Negative_Numbers_Throws_With_Numbers_List()
    {
        // arrange 
        string input = "3,-6,-9";
        // act + assert
        Action action = () => _sut.Add(input);
        action.Should().Throw<ArgumentException>().WithMessage("*-6,-9*");
    }

    [Theory]
    [InlineData("3,6", 9)]
    [InlineData("3,6,9", 18)]
    [InlineData("3,1001,6,9", 18)]
    public void Sums_CommaSeparated_Numbers(string input, int expected)
    {
        // arrange
        // act + assert
        _sut.Add(input).Should().Be(expected);
    }

    [Theory]
    [InlineData("3\n3", 6)]
    [InlineData("3,\n3,3", 9)]
    public void Sums_With_Newline_Delimiter(string input, int expected)
    {
        // arrange
        // act + assert
        _sut.Add(input).Should().Be(expected);
    }

    [Theory]
    [InlineData("1000,1", 1001)]  // 1000 counts
    [InlineData("1001,2", 2)]     // 1001 ignored
    public void Handles_Upper_Limit_Boundary(string input, int expected)
    {
        // arrange
        // act + assert
        _sut.Add(input).Should().Be(expected);
    }

    [Theory]
    [InlineData("//;\n9;9", 18)]
    [InlineData("//;\n9;9;9", 27)]
    public void Uses_Custom_SingleChar_Delimiter(string input, int expected)
    {
        // arrange
        // act + assert
        _sut.Add(input).Should().Be(expected);
    }

    [Fact]
    public void Custom_Delimiter_Other_Than_Semicolon_Works()
    {
        // arrange
        // act + assert
        _sut.Add("//|\n1|2|3").Should().Be(6);
    }

    [Fact]
    public void Adjecent_Delimiter_Do_Not_Crash()
    {
        // arrange
        string input = "1,\n2,3";
        int expected = 6;
        // act + assert
        _sut.Add(input).Should().Be(expected);
    }


}
