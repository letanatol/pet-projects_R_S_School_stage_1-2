import { templatesObject } from "../templates.js";
import { resetStopwatch } from "../stopWatch.js";
import { renderGameBox } from "../render-gameBox.js";

let randomTemplateName;

const getRandomPuzzle = () => {
  const difficultyLevels = Object.keys(templatesObject);
  const randomDifficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

  const templates = templatesObject[randomDifficulty];
  const templateNames = Object.keys(templates);
  randomTemplateName = templateNames[Math.floor(Math.random() * templateNames.length)];
  return templates[randomTemplateName];
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
      option.selected = templateName === randomTemplateName;
      templatesSelectDiv.append(option);
    })

    // section gameBox:
    renderGameBox(randomPuzzle);
  })
}
