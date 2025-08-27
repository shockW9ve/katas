export function add(input: string) {
  let replace = input.replaceAll(",", "");
  let trimmed = replace.trim();

  let sum = 0;
  for (let i = 0; i < trimmed.length; i++) {
    if (parseInt(trimmed[i]) < 0) {
      throw new Error("negative numbers are not accepted");
    } else {
      sum += parseInt(trimmed[i]);
    }
  }

  if (input === "") {
    return 0;
  }

  return sum;
}
