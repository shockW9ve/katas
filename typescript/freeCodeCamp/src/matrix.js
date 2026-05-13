var matrix = [
    [1, 2, 3],
    [4, 5, 6],
];
console.log(matrix);
function createMatrix(rows, columns, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var matrix = [];
    for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < columns; j++) {
            row.push(defaultValue);
        }
        matrix.push(row);
    }
    return matrix;
}
function transpose(matrix) {
    if (!matrix || !matrix[0]) {
        throw new Error("Matrix is missing");
    }
    var rows = matrix.length;
    var columns = matrix[0].length;
    var transposedMatrix = createMatrix(rows, columns);
    for (var i = 0; i < rows; i++) {
        console.log("1 " + matrix[i]);
        for (var j = 0; j < columns; j++) {
            console.log("2 " + matrix[i][j]);
            transposedMatrix[i][j] = matrix[i][j];
        }
    }
    return transposedMatrix;
}
var result = transpose(matrix);
console.log(result);
