"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
];
console.log(matrix);
console.log(matrix.length);
console.log(matrix[0].length);
function createMatrix(rows, columns, defaultValue = 0) {
    const matrix = [];
    for (let i = 0; i < columns; i++) {
        const row = [];
        for (let j = 0; j < rows; j++) {
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
    const rows = matrix.length;
    const columns = matrix[0].length;
    const transposedMatrix = createMatrix(rows, columns);
    if (!transposedMatrix) {
        throw new Error("No matrix was created");
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            console.log("I:" + i);
            console.log("J:" + j);
            transposedMatrix[i][j] = matrix[j][i];
            console.log(transposedMatrix);
        }
    }
    return transposedMatrix;
}
const result = transpose(matrix);
console.log(result);
//# sourceMappingURL=matrix.js.map