var arr = [1, 2, 3, 6, 5, 4, 7, 8, 9];
function findOffender(arr) {
    if (arr.length < 1 || !arr) {
        return -1;
    }
    for (var i = 0; i < arr.length; i++) {
        if (i + 1 > arr.length) {
            break;
        }
        if (arr[i + 1] < arr[i]) {
            return i + 1;
        }
    }
    if (arr[arr.length] < arr[arr.length - 1]) {
        return arr[arr.length];
    }
}
var index = findOffender(arr);
console.log({ index: index });
