export function add(input: string) {
  if (input === undefined || typeof input !== "string" || input === null) {
    throw new Error(
      "input can not be undefined, other type than String or null",
    );
  }

  let sum = 0;
  if (input.length === 0) {
    return sum;
  }

  let trimmed = input.trim();
  if (trimmed.length === 1) {
    return Number(trimmed);
  }

  let split: string[] = delimiter(trimmed);

  for (let i = 0; i < split.length; i++) {
    if (Number(split[i]) < 0) {
      throw new Error("negative numbers are not accepted");
    } else if (Number(split[i]) > 1000) {
      continue;
    } else {
      sum += Number(split[i]);
    }
  }

  return sum;
}

function delimiter(str: string) {
  let split: string[] = [];

  if (str.indexOf("\n") >= 0) {
    split = str.split("\n");
  }

  if (str.indexOf(",") >= 0) {
    split = str.split(",");
  }

  return split;
}
