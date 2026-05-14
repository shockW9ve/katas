let matrix = [
  [1, 2, 3],
  [4, 5, 6],
];

console.log(matrix);
console.log(matrix.length);
console.log(matrix[0].length);

function createMatrix(
  rows: number,
  columns: number,
  defaultValue = 0,
): number[][] {
  const matrix: number[][] = [];

  for (let i = 0; i < columns; i++) {
    const row: number[] = [];
    for (let j = 0; j < rows; j++) {
      row.push(defaultValue);
    }
    matrix.push(row);
  }

  return matrix;
}

function transpose(matrix: number[][]): number[][] {
  if (!matrix || !matrix[0] || matrix === undefined) {
    throw new Error("Matrix is missing");
  }

  const rows = matrix.length;
  const columns = matrix[0].length;
  const transposedMatrix: number[][] = createMatrix(rows, columns);

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
