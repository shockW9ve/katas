const arr = [1, 2, 3, 6, 5, 4, 7, 8, 9];
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function findOffender(arr: number[]): number {
  if (arr.length < 2) {
    return -1;
  }

  let previousIndex = 0;
  let currentIndex = 1;

  while (currentIndex < arr.length) {
    const previous = arr[previousIndex];
    const current = arr[currentIndex];

    if (previous === undefined || current === undefined) {
      return -1;
    }

    if (previous > current) {
      return previousIndex;
    }

    previousIndex++;
    currentIndex++;
  }

  return -1;
}

const index = findOffender(arr);

console.log({ index });

function findOffenderFirstAttempt(arr: number[]): number {
  if (arr.length < 2) {
    return -1;
  }

  for (let i = 1; i < arr.length; i++) {
    const previous = arr[i - 1];
    const current = arr[i];

    if (previous === undefined || current === undefined) {
      return -1;
    }

    if (previous > current) {
      return i;
    }
  }

  return -1;
}

function seniorSolution(arr: number[]): number {
  return arr.findIndex((current, index, array) => {
    const next = array[index + 1];

    return next !== undefined && current > next;
  });
}
