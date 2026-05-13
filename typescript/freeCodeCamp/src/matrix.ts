let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];

console.log(matrix);

function createMatrix(rows: number, columns: number, defaultValue = 0) {
  const matrix: number[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < columns; j++) {
      row.push(defaultValue);
    }
    matrix.push(row);
  }

  return matrix;
}

function transpose(matrix: number[][]): number[][] {
  if (!matrix || !matrix[0]) {
    throw new Error("Matrix is missing");
  }

  const rows = matrix.length;
  const columns = matrix[0].length;
  const transposedMatrix: number[][] = createMatrix(rows, columns);

  for (let i = 0; i < rows; i++) {
    console.log("1 " + matrix[i]);

    for (let j = 0; j < columns; j++) {
      console.log("2 " + matrix[i][j]);
      transposedMatrix[i][j] = matrix[i][j];
    }
  }

  return transposedMatrix;
}

const result = transpose(matrix);

console.log(result);
