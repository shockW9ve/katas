const isbnToValidate = "123-456-789-1234";

function isValidIsbn13(isbn: string): boolean {
  if (!isbn) {
    throw new Error("ISBN is missing");
  }
  const reg = /\d+/g;

  const findNum = isbn.match(reg);
  console.log(findNum);
  // split
  const splitArr = isbn.split("-");
  console.log(splitArr);
  const singleDigit = splitArr.join().split("");
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
