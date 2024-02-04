let step = 1;

const checkAnswer = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i += step) {
    for (let k = 0; k < arr2.length; k += step) {
      const rightCell = arr1[i][k];
      const normalizedUserCell = [0, 2].includes(arr2[i][k]) ? 0 : 1;
      if (rightCell !== normalizedUserCell) {
        return false;
      }
    }
  }
  return true;
}

export { checkAnswer };