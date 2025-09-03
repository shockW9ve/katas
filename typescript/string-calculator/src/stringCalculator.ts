export function add(input: string) {
  const MIN = 0;
  const MAX = 999;

  let sum = 0;
  if (input.length === 0) {
    return sum;
  }

  const trimmed = input.trim();
  if (trimmed.length === 1) {
    return Number(trimmed);
  }

  const isCustom = findHeader(trimmed);
  let split: string[] = [];

  if (isCustom) {
    split = customDelimter(
      trimmed.slice(2, 3),
      trimmed.slice(4, trimmed.length),
    );
  }

  if (!isCustom) {
    split = delimiter(trimmed);
  }

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

function delimiter(str: string): string[] {
  return str.split(/[\s,;:]+/);
}

function customDelimter(str: string, splitter: string) {
  console.log("yo " + str);

  return splitter.split(str);
}

function findHeader(str: string) {
  const HEADER = ["/", "/", ";", "\n"];
  const ARRAY = str.split("");
  let isHeader = false;
  let isCustom = false;

  for (let i = 0; i < 2; i++) {
    if (ARRAY[i] === HEADER[i]) {
      isHeader = true;
    }
  }

  if (typeof ARRAY[2] === typeof "c" && ARRAY[3] === "\n") {
    isCustom = true;
  }

  if (isHeader && isCustom) {
    return true;
  } else {
    return false;
  }
}
