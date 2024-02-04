import { getLocalStorage } from "./localStorage.js";

let userAnswer = [];
// ! при continue массив с ответами уже не содержит только нули
// поэтому выбираю массив из saveGame из LocalStorage
// но это (массив ответов подбирается из LocalStorage) так же срабатывает и при игре в другую игру, но после сохранения предыдущей, хотя игра в новую игру должна начинаться с массива ответов только с нулями 
const initUserAnswer = () => {
  const currentPuzzle = getLocalStorage('currentPuzzle');

  let lengthArray = currentPuzzle.length;
  userAnswer = Array.from({ length: lengthArray }, () => Array(lengthArray).fill(0));
}

const continueUserAnswer = () => {
  const savedGame = getLocalStorage('saveGame');

  if (savedGame && savedGame.userAnswer) {
    userAnswer = savedGame.userAnswer;
  }
  let lengthArray = currentPuzzle.length;
  userAnswer = Array.from({ length: lengthArray }, () => Array(lengthArray).fill(0));
}

const getUserAnswers = () => userAnswer;

const getPaintCell = (x, y, value) => {
  userAnswer[x][y] = value;
}

export { initUserAnswer, continueUserAnswer, getPaintCell, getUserAnswers };