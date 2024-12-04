export function shuffleArray(array: string[]): string[] {
  const shuffledArray = array.slice();
  const step = 1;
  const startIndexArray = 0;

  for (let i = shuffledArray.length - step; i > startIndexArray; i -= step) {
    const randomIndex = Math.floor(Math.random() * (i + step));
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}
