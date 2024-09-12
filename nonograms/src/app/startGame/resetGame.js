import { resetStopwatch } from '../stopWatch.js';
import { getUserAnswers, initUserAnswer } from './userAnswers.js';

let step = 1;

export const addResetButtonListeners = (div) => {
  div.addEventListener('click', () => {
    resetStopwatch();
    
    const cells = document.querySelectorAll('.grid__item');

    initUserAnswer();

    cells.forEach((cell) => {
      cell.classList.remove('mark');
      cell.classList.remove('paint');
    });
  })
}
