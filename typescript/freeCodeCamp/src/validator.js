var isbnToValidate = "123-456-789-1234";
function isValidIsbn13(isbn) {
    if (!isbn) {
        throw new Error("ISBN is missing");
    }
    var reg = /\d+/g;
    var findNum = isbn.match(reg);
    console.log(findNum);
    var digits = findNum === null || findNum === void 0 ? void 0 : findNum.map(Number);
    console.log(digits);
    var joining = digits === null || digits === void 0 ? void 0 : digits.join("");
    console.log(joining);
    var together = joining.split("");
    console.log(together[0]);
    console.log(together === null || together === void 0 ? void 0 : together.length);
    var search = isbn.search("-");
    console.log(search);
    if (findNum === null || search <= 0 || (together === null || together === void 0 ? void 0 : together.length) !== 13) {
        return false;
    }
    var calc = [];
    for (var i = 0, j = together.length; i < together.length; i++, j--) {
        console.log(together[i]);
        if (j % 2 > 0) {
            var first = together[i] * 1;
            // calc.push(first);
        }
        else {
            // calc.push(together[i] * 3);
        }
    }
    console.log(calc);
    // split
    var splitArr = isbn.split("-");
    console.log(splitArr);
    var singleDigit = splitArr.join();
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
