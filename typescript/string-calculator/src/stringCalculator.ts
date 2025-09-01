export function add(input: string) {
  const MIN = 0;
  const MAX = 999;
  const HEADER = "//;/n";

  let sum = 0;
  if (input.length === 0) {
    return sum;
  }

  const trimmed = input.trim();
  if (trimmed.length === 1) {
    return Number(trimmed);
  }

  let split: string[] = delimiter(trimmed);
  let negatives: number[] = [];
  for (let i = 0; i < split.length; i++) {
    let token: number = Number(split[i]);
    if (token < MIN) {
      negatives.push(token);
    } else if (token > MAX) {
      continue;
    } else {
      sum += token;
    }
  }

  if (negatives.length > 0) {
    throw new Error(`negative numbers are not accepted: ${negatives}`);
  }

  return sum;
}

function delimiter(str: string) {
  return str.split(/[\s,;:]+/);
}
