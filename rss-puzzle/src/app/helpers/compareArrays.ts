const START_INDEX = 0;
const STEP = 1;

export function compareArrays(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = START_INDEX; i < arr1.length; i += STEP) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
