const DEFAULT_DELIMITERS = [",", "\n"];
const MAX_NUMBER_ALLOWED = 1000;
export function add(input: string): number {
  if (input.length === 0) {
    return 0;
  }

  // 1) Parse optional header: //X\n
  const { body, custom } = parseHeader(input.trim());

  // 2) Build delimiter set (default + optional custom)
  const delimiters = new Set([",", "\n", ...(custom ? [custom] : [])]);

  // 3) Tokenize body using all delimiters (single pass)
  const tokens = tokenize(body, delimiters);

  // 4) Convert to numbers (trimmed, non-empty)
  const numbers = tokens.map(Number);

  if (numbers.some((n) => Number.isNaN(n))) {
    throw new Error(`invalid token(s): ${tokens.join(",")}`);
  }

  // 5) Validate negatives (collect all, then throw once)
  const negatives = numbers.filter((n: number) => n < 0);
  if (negatives.length > 0) {
    throw new Error(
      `negative numbers are not accepted: ${negatives.join(",")}`,
    );
  }

  // 6) Sum while ignoring > 1000
  return numbers.reduce(
    (acc: number, n: number) => (n > MAX_NUMBER_ALLOWED ? acc : acc + n),
    0,
  );
}

function parseHeader(input: string): { body: string; custom?: string } {
  const str = input.trim();

  if (str.startsWith("//") && str.length >= 4 && str[3] === "\n") {
    return { body: str.slice(4), custom: str[2] };
  }

  return { body: str };
}

function tokenize(body: string, delimiters: Set<string>): string[] {
  const tokens: string[] = [];
  let buf = "";

  for (const ch of body) {
    if (delimiters.has(ch)) {
      if (buf.length) tokens.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.length) tokens.push(buf.trim());
  return tokens.filter(Boolean);
}
