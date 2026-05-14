var matrix = [
    [1, 2, 3],
    [4, 5, 6],
];
console.log(matrix);
console.log(matrix.length);
console.log(matrix[0].length);
function createMatrix(rows, columns, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var matrix = [];
    for (var i = 0; i < columns; i++) {
        var row = [];
        for (var j = 0; j < rows; j++) {
            row.push(defaultValue);
        }
        matrix.push(row);
    }
    return matrix;
}
function transpose(matrix) {
    if (!matrix || !matrix[0] || matrix === undefined) {
        throw new Error("Matrix is missing");
    }
    var rows = matrix.length;
    var columns = matrix[0].length;
    var transposedMatrix = createMatrix(rows, columns);
    if (!transposedMatrix) {
        throw new Error("No matrix was created");
    }
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            console.log("I:" + i);
            console.log("J:" + j);
            transposedMatrix[i][j] = matrix[j][i];
            console.log(transposedMatrix);
        }
    }
    return transposedMatrix;
}
var result = transpose(matrix);
console.log(result);
