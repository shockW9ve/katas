const isbnToValidate = "123-456-789-1234";

function isValidIsbn13(isbn: string): boolean {
  if (!isbn) {
    throw new Error("ISBN is missing");
  }

  // split
  // convert
  // checks

  return true;
}

const result = isValidIsbn13(isbnToValidate);

console.log(result);
