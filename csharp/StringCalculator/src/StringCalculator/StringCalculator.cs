using System.Text;

namespace StringCalculator;

public class StringCalculator
{
    private const int UpperLimit = 1000;
    private const int HeaderLength = 4;

    public int Add(string input)
    {
        if (input.Length == 0)
        {
            return 0;
        }

        // parse header
        Header parsedHeader = ParseHeader(input.Trim());
        // build delimter
        HashSet<char> delimiter = BuildDelimiters(parsedHeader);
        // tokenize
        List<string> tokens = Tokenize(parsedHeader.body, delimiter);
        // numerize
        int numbers = Numerize(tokens);

        return numbers;
    }

    private static Header ParseHeader(string header)
    {
        if (header.StartsWith("//") && header.Length >= HeaderLength && header[3] == '\n')
        {
            return new Header(body: header.Substring(4), custom: header[2]);
        }

        return new Header(body: header, custom: null);
    }

    private static HashSet<char> BuildDelimiters(Header header)
    {
        HashSet<char> delimiters = new HashSet<char> { ',', '\n' };
        if (header.custom is char c)
        {
            delimiters.Add(c);
        }

        return delimiters;
    }

    private static List<string> Tokenize(string body, HashSet<char> delimiters)
    {
        List<string> tokens = new List<string>();
        StringBuilder buffer = new StringBuilder();

        foreach (var c in body)
        {
            if (delimiters.Contains(c))
            {
                if (buffer.Length > 0)
                {
                    tokens.Add(buffer.ToString().Trim());
                    buffer.Clear();
                }
            }
            else
            {
                buffer.Append(c);
            }
        }

        if (buffer.Length > 0)
        {
            tokens.Add(buffer.ToString().Trim());
        }

        return tokens;
    }

    private static int Numerize(List<string> tokens)
    {
        List<int> negatives = new List<int>();
        int sum = 0;

        foreach (string token in tokens)
        {
            if (!int.TryParse(token, out int num))
            {
                throw new ArgumentException($"Invalid token: '{token}'");
            }

            if (num < 0)
            {
                negatives.Add(num);
                continue;
            }

            if (num <= UpperLimit)
            {
                sum += num;
            }
        }

        if (negatives.Count > 0)
        {
            throw new ArgumentException($"Negative numbers are not allowed: {string.Join(",", negatives)}");
        }

        return sum;
    }
}

public record Header(string body, char? custom) { }
