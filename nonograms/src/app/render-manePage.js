import { stopWatchSection, renderStopWatch } from "./renderStopWatch.js";
import { levelsSection, renderLevelsSection } from "./renderLevels.js";
import { gameBoxSection, renderGameBox } from "./render-gameBox.js";
import { listTemplatesSection, renderSelectTemplates } from "./renderListTemplates.js";
import { randomSection, renderRandomSection } from "./renderRandomSection.js";
import { buttonsSection, renderButtonsSection } from "./renderButtonsSection.js";
import { renderButtonThemeSection, buttonThemeSection } from "./renderButtonTheme.js";
import { renderResultSection, resultGameSection } from "./renderResultGame.js";
import { levels } from "./levels.js";
import { templatesObject } from "./templates.js";
import { initUserAnswer } from "./startGame/userAnswers.js";
import { renderModal } from "./startGame/renderModal.js";
import { addLevelSelectListeners } from "./startGame/selectLevel.js";
import { addSelectTemplateListeners } from "./startGame/selectTemplate.js";

export const container = document.createElement('main');
container.className = 'container';

const controls = document.createElement('div');
controls.className = 'controls';

const field = document.createElement('main');
field.className = 'field';

function renderManePage(arrayLevels, templatesObject) {
  renderStopWatch();
  renderLevelsSection(arrayLevels);
  renderSelectTemplates(templatesObject.easy);
  renderGameBox(templatesObject.easy.tree);
  renderButtonsSection();
  renderButtonThemeSection();
  renderResultSection();
  renderRandomSection();
  initUserAnswer();
  renderModal();

  controls.append(stopWatchSection);
  controls.append(levelsSection);
  controls.append(listTemplatesSection);
  controls.append(randomSection);
  field.append(gameBoxSection);
  controls.append(buttonsSection);
  controls.append(buttonThemeSection);
  controls.append(resultGameSection);

  container.append(controls)
  container.append(field)
  document.body.prepend(container);

  addLevelSelectListeners();
  addSelectTemplateListeners();
}

renderManePage(levels, templatesObject);

export function resetManePage() {
  while (stopWatchSection.firstChild) {
    stopWatchSection.removeChild(stopWatchSection.firstChild);
  }
  while (levelsSection.firstChild) {
    levelsSection.removeChild(levelsSection.firstChild);
  }
  while (randomSection.firstChild) {
    randomSection.removeChild(randomSection.firstChild);
  }
  while (gameBoxSection.firstChild) {
    gameBoxSection.removeChild(gameBoxSection.firstChild);
  }
  while (buttonsSection.firstChild) {
    buttonsSection.removeChild(buttonsSection.firstChild);
  }
  while (buttonThemeSection.firstChild) {
    buttonThemeSection.removeChild(buttonThemeSection.firstChild);
  }
  while (resultGameSection.firstChild) {
    resultGameSection.removeChild(resultGameSection.firstChild);
  }
  const gameModal = document.querySelector('.game-modal');
  if (gameModal) {
    gameModal.remove();
  }
  renderManePage(levels, templatesObject);
}
