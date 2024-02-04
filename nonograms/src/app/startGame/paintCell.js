import { getPaintCell } from './userAnswers.js';
import { checkAnswer } from './checkAnswer.js';
import { getLocalStorage } from './localStorage.js';
import { getUserAnswers } from './userAnswers.js';
import { getTime, resetStopwatch } from '../stopWatch.js';
import { getWinResults } from './winResults.js';

const markSound = new Audio('../assets/audio/mark.mp3');
const paintSound = new Audio('../assets/audio/paint.mp3');
const cleanSound = new Audio('../assets/audio/clean.mp3');

let modalSound = new Audio('../assets/audio/win.mp3');

let isSoundActive = true;

export const getSoundState = () => isSoundActive;

export const setSoundDisable = () => {
  isSoundActive = false;
};

export const setSoundEnable = () => {
  isSoundActive = true;
};

export function stopAndReset(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function playWinSound() {
  if (isSoundActive) {
    modalSound.play();
  }
}

export const addStopAndResetListener = (div) => {
  div.addEventListener('click', () => {
    stopAndReset(modalSound);
  })
}

export function paintCell(div) {
  div.addEventListener('click', (event) => {
    const targetElement = event.target;
    let x = targetElement.dataset.row;
    console.log(x, "x");
    let y = targetElement.dataset.col;
    console.log(y, "y");
    stopAndReset(markSound);
    stopAndReset(paintSound);
    stopAndReset(cleanSound);

    if (targetElement.classList.contains('grid__item')) {
      if (targetElement.classList.contains('mark')) {
        targetElement.classList.remove('mark');
      }
      if (targetElement.classList.contains('paint')) {
        getPaintCell(x, y, 0);

        if (isSoundActive) {
          cleanSound.play();
        }
      }
      if (!targetElement.classList.contains('paint')) {
        getPaintCell(x, y, 1);

        if (isSoundActive) {
          paintSound.play();
        }
      }

      targetElement.classList.toggle('paint');
    }
    const isWinner = checkAnswer(getLocalStorage('currentPuzzle'), getUserAnswers());
    if (isWinner) {
      getWinResults();
      const time = getTime();

      const gameModal = document.querySelector('.game-modal');
      gameModal.classList.add("show");

      const gameModalText = document.querySelector('.game-modal__text');
      gameModalText.innerHTML = `Great! You have solved the nonogram in ${time} seconds!`;
      playWinSound();
      resetStopwatch();
    }
  });

  div.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const targetElement = event.target;
    let x = targetElement.dataset.row;
    let y = targetElement.dataset.col;

    if (targetElement.classList.contains('grid__item')) {
      if (targetElement.classList.contains('paint')) {
        targetElement.classList.remove('paint');
      }
      if (targetElement.classList.contains('mark')) {
        getPaintCell(x, y, 0);

        if (isSoundActive) {
          cleanSound.play();
        }
      }
      if (!targetElement.classList.contains('mark')) {
        getPaintCell(x, y, 2);

        if (isSoundActive) {
          markSound.play();
        }
      }
      targetElement.classList.toggle('mark');
    }
  });
}
