import { getUserAnswers } from "./userAnswers.js";
import { getTime } from "../stopWatch.js";
import { setLocalStorage, getLocalStorage } from "./localStorage.js";
import { getSelectedLevel } from "./selectLevel.js";
import { getSelectedTemplate } from "./selectTemplate.js";

function saveGame() {
  const time = getTime();
  if (time === 0) {
    return false;
  }
  const userAnswer = getUserAnswers();
  const currentPuzzle = getLocalStorage('currentPuzzle');
  const currentLevel = getSelectedLevel();
  const currentPuzzleName = getSelectedTemplate();

  setLocalStorage('saveGame', { currentPuzzle, userAnswer, time, currentLevel, currentPuzzleName });
  
  alert('Save game');
}

export { saveGame };