import { getLocalStorage } from "./startGame/localStorage.js";

export const resultGameSection = document.createElement('section');

let step = 1;
export function renderResultSection() {
  resultGameSection.classList.add('result-game');

  const resultGameTitle = document.createElement('p');
  resultGameTitle.classList.add('result-game__title');
  resultGameTitle.innerHTML = 'Results:';

  const gameResult5 = getLocalStorage('sortSaveResult5');
  if (gameResult5) {
    let serialNumber = 1;

    gameResult5.forEach((game) => {
      const gameDiv = document.createElement('div');
      gameDiv.classList.add('game');

      const numberDiv = document.createElement('div');
      numberDiv.classList.add('number__game');
      numberDiv.innerHTML = `${serialNumber}.`;
      serialNumber += step;

      const nameDiv = document.createElement('div');
      nameDiv.classList.add('name__game');
      nameDiv.innerHTML = `${game.puzzle}`;

      const levelDiv = document.createElement('div');
      levelDiv.classList.add('level__game');
      levelDiv.innerHTML = `${game.level}`;

      const stopWatchWrapper = document.createElement('div');
      stopWatchWrapper.classList.add('stop-watch__wrapper');

      const timeMinutes = document.createElement('span');
      timeMinutes.classList.add('stop-watch__time', 'time-minutes');
      const minutes = game.time.minutes;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      timeMinutes.innerText = formattedMinutes;

      const colon = document.createElement('span');
      colon.classList.add('colon');
      colon.innerText = ':';

      const timeSeconds = document.createElement('span');
      timeSeconds.classList.add('stop-watch__time', 'time-seconds');
      const seconds = game.time.seconds;
      const formattedSeconds = seconds.toString().padStart(2, '0');
      timeSeconds.innerText = formattedSeconds;

      stopWatchWrapper.append(timeMinutes);
      stopWatchWrapper.append(colon);
      stopWatchWrapper.append(timeSeconds);

      gameDiv.append(numberDiv);
      gameDiv.append(nameDiv);
      gameDiv.append(levelDiv);
      gameDiv.append(stopWatchWrapper);
      resultGameSection.append(gameDiv);
    });

    resultGameSection.prepend(resultGameTitle);
  }
}
