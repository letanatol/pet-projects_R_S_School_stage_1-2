import { resetStopwatch } from "../stopWatch.js";
import { getUserAnswers } from "./userAnswers.js";

let step = 1;

export const addResetButtonListeners = (div) => {
  div.addEventListener('click', () => {
    resetStopwatch();
    const arrayAnswer = getUserAnswers();
    const cells = document.querySelectorAll('.grid__item');

    let gameFieldLength = arrayAnswer.length;
    let gameFieldWidth = arrayAnswer[0].length;

    for (let i = 0; i < gameFieldLength; i += step) {
      for (let k = 0; k < gameFieldWidth; k += step) {
        if (arrayAnswer[i][k] === 1) {

          for (let z = 0; z < cells.length; z += step) {
            arrayAnswer[i][k] = 0;
            const currentCell = cells[z];

            if (currentCell.classList.contains('mark')) {
              console.log("класс есть");
              currentCell.classList.remove('mark');
            }

            if (currentCell.classList.contains('paint')) {
              currentCell.classList.remove('paint');
            }
          }

          if (arrayAnswer[i][k] === 2) {
            for (let z = 0; z < cells.length; z += step) {
              arrayAnswer[i][k] = 0;
              const currentCell = cells[z];

              if (currentCell.classList.contains('mark')) {
                console.log("класс есть");
                currentCell.classList.remove('mark');
              }

              if (currentCell.classList.contains('paint')) {
                currentCell.classList.remove('paint');
              }
            }
          }
        }
      }
    }
  })
}
