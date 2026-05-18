const isbnToValidate = "123-456-789-1234";

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

  const calc: [] = [];
  for (let i = 0, j = together.length; i < together.length; i++, j--) {
    console.log(together[i]);
    if (j % 2 > 0) {
      let first: number = 1:number * together[i];
      // calc.push(first);
    } else {
      // calc.push(together[i] * 3);
    }
  }
  console.log(calc);

  // split
  const splitArr = isbn.split("-");
  console.log(splitArr);
  const singleDigit = splitArr.join();
  console.log(singleDigit);
  const onlyNumbers: number[] = [];
  // convert
  for (let num of splitArr) {
    let nr = Number(num);
    if (typeof nr !== "number" && isNaN(nr)) {
      return false;
    }
    onlyNumbers.push(nr);
  }
  // checks
  if (onlyNumbers.join().length !== 13) {
    return false;
  }

  return true;
}

const result = isValidIsbn13(isbnToValidate);

console.log(result);
