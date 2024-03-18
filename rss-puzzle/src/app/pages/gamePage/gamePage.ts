import './gamePage.scss';
import { OptionComponent } from '@components/optionComponent';
import { SourceBlock } from '@components/sourceBlock/sourceBlock';
import { EventTypes } from '@helpers/types';
import { getElement, getElementById } from '@helpers/utils';
import { state } from '@helpers/State/State';
import { removeContent } from '@helpers/removeContent';

export class GamePage {
  public drawGameContainer(): HTMLElement {
    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');

    // HEADER
    const gameBoxHeader = document.createElement('div');
    gameBoxHeader.classList.add('game-box__header');

    const gameBoxHeaderOptions = document.createElement('div');
    gameBoxHeaderOptions.classList.add('options');

    // LEVEL
    const levelsCount = state.getLevelsCount();
    const levelSelect = new OptionComponent('level', levelsCount);
    const levelDiv = levelSelect.createOption();
    levelDiv.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const selectedOption = target.options[target.selectedIndex];

      if (selectedOption) {
        state.setLevelCurrent(selectedOption.value);
      }
    });

    // ROUND
    const roundsCount = state.getRoundsCount();
    const roundSelect = new OptionComponent('round', roundsCount);
    const roundDiv = roundSelect.createOption();
    roundDiv.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const selectedOption = target.options[target.selectedIndex];

      if (selectedOption) {
        state.setRoundCurrent(selectedOption.value);
      }
    });

    gameBoxHeaderOptions.append(levelDiv);
    gameBoxHeaderOptions.append(roundDiv);
    gameBoxHeader.append(gameBoxHeaderOptions);

    // RESULT
    const gameBoxResultBlock = document.createElement('div');
    gameBoxResultBlock.classList.add('result-block');
    gameBoxResultBlock.addEventListener('click', ((event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.parentElement && target.parentElement.id === state.getRowCurrent().toString()) {
        const wrapperSource = getElement(document.body, '.wrapper_source');
        wrapperSource.append(target);
      }
    }) as EventListener);

    const startIndex = 0;
    const countDiv = 10;
    const step = 1;
    for (let i = startIndex; i < countDiv; i += step) {
      const rowResultBlock = document.createElement('div');
      rowResultBlock.classList.add('row__result-block');
      rowResultBlock.id = `${i}`;
      gameBoxResultBlock.appendChild(rowResultBlock);
    }

    // addEventListener addEventListener addEventListener addEventListener addEventListener
    window.addEventListener(EventTypes.ChangeLevel, ((event: CustomEvent<{ level: string }>) => {
      const newValue = event.detail.level;
      levelSelect.changeSelectedOption(newValue);
      removeContent('.row__result-block');
    }) as EventListener);

    window.addEventListener(EventTypes.ChangeRound, ((event: CustomEvent<{ round: string }>) => {
      const newValue = event.detail.round;
      roundSelect.changeSelectedOption(newValue);
      removeContent('.row__result-block');
    }) as EventListener);

    // SOURCE
    const gameBoxSourceBlock = document.createElement('div');
    gameBoxSourceBlock.classList.add('source-block');

    const testSourceBlock = new SourceBlock().getComponent();
    gameBoxSourceBlock.append(testSourceBlock);

    window.addEventListener('wordClick', ((event: CustomEvent<{ word: HTMLElement }>) => {
      const element = getElementById<HTMLElement>(state.getRowCurrent().toString());
      if (element) {
        element.append(event.detail.word);
      }
    }) as EventListener);

    gameBox.append(gameBoxHeader, gameBoxResultBlock, gameBoxSourceBlock);

    return gameBox;
  }
}
