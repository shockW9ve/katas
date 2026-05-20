const isbnToValidate = "121-446-789-1234";

function isValidIsbn(isbn: string): boolean {
  if (isbn.trim() === "") {
    return false;
  }

  const digits = isbn.replace(/[-\s]/g, "");

  if (!/^\d{13}$/.test(digits)) {
    return false;
  }
  console.log("2:" + digits);

  const sum = digits.split("").reduce((total, digit, index) => {
    const weight = index % 2 === 0 ? 1 : 3;
    const value = Number(digit) * weight;

    console.log({ index, digit, weight, value, total });
    return total + value;
  }, 0);

  return sum % 10 === 0;
}

function isValidIsbn13(isbn: string): boolean {
  if (!isbn) {
    throw new Error("ISBN is missing");
  }
  const reg = /\d+/g;

  const findNum = isbn.match(reg);

  console.log(findNum);
  const digits = findNum?.map(Number);
  console.log(digits);
  const joining = digits?.join("");
  console.log(joining);
  const together = joining.split("");
  console.log(together[0]);
  console.log(together?.length);
  const search = isbn.search("-");
  console.log(search);

  if (findNum === null || search <= 0 || together?.length !== 13) {
    return false;
  }

  const calc = [];
  for (let i = 0, j = together.length; i < together.length; i++, j--) {
    if (j % 2 > 0) {
      calc.push(Number(together[i]) * 1);
    } else {
      calc.push(Number(together[i]) * 3);
    }
  }
  console.log(calc);

  const sum = calc.reduce((prev, cur) => prev + cur, 0);
  console.log(sum);
  if (sum % 10 !== 0) {
    return false;
  }

  return true;
}

const result = isValidIsbn13(isbnToValidate);

console.log(result);

const result2 = isValidIsbn(isbnToValidate);

console.log({ result2 });
