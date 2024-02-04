import { getLocalStorage } from "./localStorage.js";
import { resetStopwatch } from "../stopWatch.js";

export function showSolution() {
  resetStopwatch();
  const solution = getLocalStorage('currentPuzzle');
  let step = 1;

  const cells = document.querySelectorAll('.grid__item');

  let gameFieldLength = solution.length;
  let gameFieldWidth = solution[0].length;
  for (let i = 0; i < gameFieldLength; i += step) {
    for (let k = 0; k < gameFieldWidth; k += step) {
      if (solution[i][k] === 1) {
        for (let z = 0; z < cells.length; z += step) {
          const cellRow = parseInt(cells[z].dataset.row);
          const cellCol = parseInt(cells[z].dataset.col);

          if (cellRow === i && cellCol === k) {
            cells[z].classList.add('paint');
            cells[z].classList.remove('mark');
          }
        }
      }
      if (solution[i][k] !== 1) {
        for (let z = 0; z < cells.length; z += step) {
          const cellRow = parseInt(cells[z].dataset.row);
          const cellCol = parseInt(cells[z].dataset.col);

          if (cellRow === i && cellCol === k) {
            // cells[z].classList.add('cleanCell');
            cells[z].classList.remove('paint');
            cells[z].classList.remove('mark');
          }
        }
      }
    }
  }
}
