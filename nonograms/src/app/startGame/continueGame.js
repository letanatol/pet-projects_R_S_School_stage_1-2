import { getLocalStorage } from './localStorage.js';
import { templatesObject } from '../templates.js';
import { initTimer, resetStopwatch, getCurrentTimer } from '../stopWatch.js';
import { renderGameBoxField, renderGameBox } from '../render-gameBox.js';
import { continueUserAnswer, initUserAnswer } from './userAnswers.js';
import { showUserAnswer } from './showUserAnswer.js';
import { buttonsSection, renderButtonsSection } from '../renderButtonsSection.js';
import { setSelectedTemplate } from './selectTemplate.js';
import { setSelectedLevel } from './selectLevel.js';

// TODO не работает stopWatch после continue
// TODO не работает resetButton после continue
// TODO не работает userAnswer некорректно работает после continue
// TODO после continue продолжить играть и опять save - только последние действия сохранит (после continue)

export const continueGame = () => {
  const { currentPuzzle, userAnswer, time, currentLevel, currentPuzzleName } = getLocalStorage('saveGame');

  // section stopWatch:
  const minutesDiv = document.querySelector('.time-minutes');
  const secondsDiv = document.querySelector('.time-seconds');
  console.log(getCurrentTimer());
  resetStopwatch();
  initTimer(minutesDiv, secondsDiv, time);

  // section levels:
  let difficulty = currentLevel;

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

  setSelectedLevel(difficulty);
  
  listTemplates.forEach(templateName => {
    const option = document.createElement('option');
    option.value = templateName;
    option.innerText = `${templateName.slice(0, 1).toUpperCase()}${templateName.slice(1)}`;
    option.selected = templateName === currentPuzzleName;
    templatesSelectDiv.append(option);
  });
  
  setSelectedTemplate(currentPuzzleName);
  
  renderGameBoxField(currentPuzzle);
  renderGameBox(currentPuzzle);

  initUserAnswer();
  continueUserAnswer();
  showUserAnswer(userAnswer);

  while (buttonsSection.firstChild) {
    buttonsSection.removeChild(buttonsSection.firstChild);
  }
  renderButtonsSection();
}