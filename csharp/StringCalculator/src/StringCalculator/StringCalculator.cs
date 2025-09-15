namespace StringCalculator;

public class StringCalculator
{
    private readonly int UPPER_LIMIT = 1000;
    private readonly int LOWER_LIMIT = 0;
    private readonly int HEADER_LENGTH = 4;

    public int Add(string input)
    {
        if (input.Length == 0)
        {
            return 0;
        }

        // parse header
        Header parsedHeader = ParseHeader(input.Trim());
        // build delimter
        HashSet<string> delimiter = BuildDelimter(parsedHeader);
        // tokenize
        List<string> tokens = Tokenize(parsedHeader.body, delimiter);
        // numerize
        int numbers = Numerize(tokens);

        return numbers;
    }

    private Header ParseHeader(string header)
    {
        if (header.StartsWith("//") && header.Length >= HEADER_LENGTH && header[3].Equals("\n"))
        {
            return new Header(header.Substring(4), header[2]);
        }

        return new Header(body: header, custom: null);
    }

    private HashSet<string> BuildDelimter(Header header)
    {
        string? custom = (header.custom.HasValue) ? Convert.ToString(header.custom) : "";
        if (custom != null)
        {
            return new HashSet<string>([",", "\n", custom]);
        }
        else
        {
            return new HashSet<string>([",", "\n"]);
        }
    }

    private List<string> Tokenize(string body, HashSet<string> delimiter)
    {
        List<string> tokens = new List<string>();
        string buffer = "";

        foreach (var c in body)
        {
            if (delimiter.Contains(Convert.ToString(c)))
            {
                if (buffer.Length > 0)
                {
                    tokens.Add(buffer.Trim());
                }
                buffer = "";
            }
            else
            {
                buffer += c;
            }
        }

        if (buffer.Length > 0)
        {

            tokens.Add(buffer.Trim());
        }
        return tokens;
    }

    private int Numerize(List<string> tokens)
    {
        int sum = 0;
        for (int i = 0; i < tokens.Count; i++)
        {
            if (Convert.ToInt32(tokens[i]) > UPPER_LIMIT)
            {
                continue;
            }
            else if (Convert.ToInt32(tokens[i]) < LOWER_LIMIT)
            {
                throw new ArgumentException("Negative numbers are not allowed");
            }
            else
            {
                sum += Convert.ToInt32(tokens[i]);
            }
        }
        return sum;
    }
}

public record Header(string body, char? custom) { }
