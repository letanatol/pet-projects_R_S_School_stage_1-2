import { templatesObject } from '../templates.js';
import { resetStopwatch } from '../stopWatch.js';
import { renderGameBox, renderGameBoxField } from '../render-gameBox.js';
import { paintCell } from './paintCell.js';
import { initUserAnswer } from './userAnswers.js';
import { setLocalStorage } from './localStorage.js';

let randomPuzzleName;

const getRandomPuzzle = () => {
  const listLevels = Object.keys(templatesObject);
  const randomLevel = listLevels[Math.floor(Math.random() * listLevels.length)];

  const listPuzzle = templatesObject[randomLevel];
  const listPuzzleNames = Object.keys(listPuzzle);
  randomPuzzleName = listPuzzleNames[Math.floor(Math.random() * listPuzzleNames.length)];
  return listPuzzle[randomPuzzleName];
};

export const addRandomButtonListeners = (div) => {
  div.addEventListener('click', () => {
    const randomPuzzle = getRandomPuzzle();

    // section stopWatch::
    resetStopwatch();

    // section levels:
    let difficulty = 'easy';
    if (randomPuzzle.length === 10) {
      difficulty = 'medium';
    } else if (randomPuzzle.length === 15) {
      difficulty = 'hard';
    }

    const radioInput = document.getElementById(difficulty);

    if (radioInput) {
      radioInput.checked = true;
    }

    // section listTemplate:
    const templatesSelectDiv = document.getElementById('templates');

    while (templatesSelectDiv.firstChild) {
      templatesSelectDiv.removeChild(templatesSelectDiv.firstChild);
    }

    let listTemplates;
    const levels = (Object.keys(templatesObject));
    levels.forEach((level) => {
      if (level === difficulty) {
        listTemplates = Object.keys(templatesObject[level]);
      }
    })

    listTemplates.forEach(templateName => {
      const option = document.createElement('option');
      option.value = templateName;
      option.innerText = `${templateName.slice(0, 1).toUpperCase()}${templateName.slice(1)}`;
      option.selected = templateName === randomPuzzleName;
      templatesSelectDiv.append(option);
    })

    // section gameBox:
    // const gameBoxField = document.querySelector('.game-box__field');
    // paintCell(gameBoxField);
    // renderGameBoxField(randomPuzzle);
    setLocalStorage('currentPuzzle', randomPuzzle);
    initUserAnswer();
    renderGameBox(randomPuzzle);
  })
}
