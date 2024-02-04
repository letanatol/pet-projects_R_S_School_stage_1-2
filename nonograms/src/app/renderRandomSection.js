import { addRandomButtonListeners } from "./startGame/randomGame.js";

export const randomSection = document.createElement('section');

export function renderRandomSection() {
  randomSection.classList.add('section', 'random');

  const buttonRandom = document.createElement('button');
  buttonRandom.classList.add('button', 'button-random');
  buttonRandom.innerText = 'Random game';
  addRandomButtonListeners(buttonRandom);

  randomSection.append(buttonRandom);
}
