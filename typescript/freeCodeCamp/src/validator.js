var isbnToValidate = "121-446-789-1234";
function isValidIsbn(isbn) {
    if (isbn.trim() === "") {
        return false;
    }
    var digits = isbn.replace(/[-\s]/g, "");
    if (!/^\d{13}$/.test(digits)) {
        return false;
    }
    console.log("2:" + digits);
    var sum = digits.split("").reduce(function (total, digit, index) {
        var weight = index % 2 === 0 ? 1 : 3;
        var value = Number(digit) * weight;
        console.log({ index: index, digit: digit, weight: weight, value: value, total: total });
        return total + value;
    }, 0);
    return sum % 10 === 0;
}
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
var result2 = isValidIsbn(isbnToValidate);
console.log({ result2: result2 });
