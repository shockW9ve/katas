var isbnToValidate = "123-456-789-1234";
function isValidIsbn13(isbn) {
    if (!isbn) {
        throw new Error("ISBN is missing");
    }
    var reg = /\d+/g;
    var findNum = isbn.match(reg);
    console.log(findNum);
    // split
    var splitArr = isbn.split("-");
    console.log(splitArr);
    var singleDigit = splitArr.join().split("");
    console.log(singleDigit);
    var onlyNumbers = [];
    // convert
    for (var _i = 0, splitArr_1 = splitArr; _i < splitArr_1.length; _i++) {
        var num = splitArr_1[_i];
        var nr = Number(num);
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
var result = isValidIsbn13(isbnToValidate);
console.log(result);
