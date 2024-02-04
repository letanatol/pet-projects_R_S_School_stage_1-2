import { setLocalStorage, getLocalStorage } from './localStorage.js';
import { getTime } from "../stopWatch.js";

const MAX_GAMES = 5;

export const getWinResults = () => {
  // result stopwatch:
  const time = getTime();
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  // name current puzzle:
  let puzzle;
  const optionsDiv = document.querySelectorAll('option');
  optionsDiv.forEach((option) => {
    if (option.selected === true) {
      let puzzleValue = option.value;
      puzzle = puzzleValue.slice(0, 1).toUpperCase() + puzzleValue.slice(1);
    }
  })

  // level:
  let level;
  const levelsDiv = document.querySelectorAll('.levels__input');
  levelsDiv.forEach((input) => {
    if (input.checked === true) {
      let levelValue = input.value;
      level = levelValue.slice(0, 1).toUpperCase() + levelValue.slice(1);
    }
  })

  const resultGame = { puzzle, level, time: { minutes, seconds } };
  saveResult5(resultGame);
}

const saveResult5 = (resultGame) => {
  const gameResult5 = getLocalStorage('gameResult5');

  if (gameResult5) {
    if (gameResult5.length >= MAX_GAMES) {
      gameResult5.shift();
    }
    gameResult5.push(resultGame);
    setLocalStorage('gameResult5', [...gameResult5]);


    gameResult5.sort((a, b) => {
      const timeA = a.time.minutes * 60 + a.time.seconds;
      const timeB = b.time.minutes * 60 + b.time.seconds;
      return timeA - timeB;
    });

    setLocalStorage('sortSaveResult5', [...gameResult5]);
  }

  if (!gameResult5) {
    setLocalStorage('gameResult5', [resultGame]);
    setLocalStorage('sortSaveResult5', [resultGame]);
  }
}
