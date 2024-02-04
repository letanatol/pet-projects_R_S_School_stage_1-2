export const buttonsSection = document.createElement('section');

import { saveGame } from "./startGame/saveGame.js";
import { continueGame } from './startGame/continueGame.js';
import { showSolution } from "./startGame/showSolution.js";
import { addResetButtonListeners } from "./startGame/resetGame.js";

export function renderButtonsSection() {
  buttonsSection.classList.add('buttons');

  const buttonSave = document.createElement('button');
  buttonSave.classList.add('button', 'button-save');
  buttonSave.innerText = 'Save game';
  buttonSave.addEventListener('click', saveGame);

  const buttonContinue = document.createElement('button');
  buttonContinue.classList.add('button', 'button-continue');
  buttonContinue.innerText = 'Continue game';
  buttonContinue.addEventListener('click', continueGame);

  const buttonReset = document.createElement('button');
  buttonReset.classList.add('button', 'button-reset');
  buttonReset.innerText = 'Reset game';
  addResetButtonListeners(buttonReset);

  const buttonSolution = document.createElement('button');
  buttonSolution.classList.add('button', 'button-solution');
  buttonSolution.innerText = 'Solution';
  buttonSolution.addEventListener('click', showSolution);

  buttonsSection.append(buttonSave);
  buttonsSection.append(buttonContinue);
  buttonsSection.append(buttonReset);
  buttonsSection.append(buttonSolution);
}
