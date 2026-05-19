var isbnToValidate = "121-446-789-1234";
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
        if (j % 2 > 0) {
            calc.push(Number(together[i]) * 1);
        }
        else {
            calc.push(Number(together[i]) * 3);
        }
    }
    console.log(calc);
    var sum = calc.reduce(function (prev, cur) { return prev + cur; }, 0);
    console.log(sum);
    if (sum % 10 !== 0) {
        return false;
    }
    return true;
}
var result = isValidIsbn13(isbnToValidate);
console.log(result);
