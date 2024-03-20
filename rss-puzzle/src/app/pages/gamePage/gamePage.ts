import { ButtonComponent } from '@components/buttonComponent';
import './gamePage.scss';
import { OptionComponent } from '@components/optionComponent';
import { SourceBlock } from '@components/sourceBlock/sourceBlock';
import { dispatchCustomEvent } from '@helpers/dispatchCustomEvent';
import { EventTypes } from '@helpers/types';
import { getElement, getElementById } from '@helpers/utils';
import { state } from '@helpers/State/State';
import { removeContent } from '@helpers/removeContent';
import { isArraysEqual, validateArrays } from '@helpers/compareArrays';
import { nextRowRoundLevel } from '@helpers/nextRowRoundLevel';

const FIRST_ROW = 0;
const WIDTH_CONTAINER = 760;

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

    // HINT Sound and translation
    const gameBoxSoundHint = document.createElement('div');
    gameBoxSoundHint.classList.add('sound-hint__wrapper');

    // RESULT
    const gameBoxResultBlock = document.createElement('div');
    gameBoxResultBlock.classList.add('result-block');
    gameBoxResultBlock.addEventListener('click', ((event: MouseEvent) => {
      const target = event.target as HTMLElement;
      target.classList.remove('red-border');

      if (target && target.parentElement && target.parentElement.id === state.getRowCurrent().toString()) {
        const word = target.textContent;
        if (word) {
          state.removeWordUser(word);
        }

        const wrapperSource = getElement(document.body, '.wrapper_source');
        wrapperSource.append(target);

        if (state.getWordSource().length !== state.getWordUser().length) {
          state.updateUi({
            continueHidden: true,
            checkHidden: true,
            noKnowHidden: false,
          });
        }
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
      state.clearWords('wordUser');
      state.setRowCurrent(FIRST_ROW);
      state.clearWords('wordKnow');
      state.clearWords('wordNoKnow');
      state.updateUi({
        continueHidden: true,
        checkHidden: true,
        noKnowHidden: false,
      });
    }) as EventListener);

    window.addEventListener(EventTypes.ChangeRound, ((event: CustomEvent<{ round: string }>) => {
      const newValue = event.detail.round;
      roundSelect.changeSelectedOption(newValue);
      removeContent('.row__result-block');
      state.clearWords('wordUser');
      state.setRowCurrent(FIRST_ROW);
      state.clearWords('wordKnow');
      state.clearWords('wordNoKnow');
      state.updateUi({
        continueHidden: true,
        checkHidden: true,
        noKnowHidden: false,
      });
    }) as EventListener);

    // SOURCE
    const gameBoxSourceBlock = document.createElement('div');
    gameBoxSourceBlock.classList.add('source-block');

    // TODO проверить есть ли в LocalStorage последний round, иначе ...?

    const testSourceBlock = new SourceBlock().getComponent();
    gameBoxSourceBlock.append(testSourceBlock);

    window.addEventListener('wordClick', ((event: CustomEvent<{ word: HTMLElement }>) => {
      const element = getElementById<HTMLElement>(state.getRowCurrent().toString());
      if (element) {
        element.append(event.detail.word);
        const { word } = event.detail.word.dataset;

        if (word) {
          state.addWordUser(word);
        }
      }
    }) as EventListener);

    // BUTTONS
    const gameBoxButtons = document.createElement('div');
    gameBoxButtons.classList.add('game-box__buttons');

    // I don't know
    const buttonNoKnow = new ButtonComponent(`I don't know`, () => this.fillResultBlockRow()).createButton();

    // Check
    const checkButtonWrapper = new ButtonComponent('Check', () => {
      validateArrays(state.getWordSource(), state.getWordUser());
    });

    const buttonCheck = checkButtonWrapper.createButton();
    buttonCheck.classList.add('hidden');

    // Continue
    const button = new ButtonComponent('Continue', () => nextRowRoundLevel());
    const buttonContinue = button.createButton();
    buttonContinue.classList.add('hidden');

    window.addEventListener('wordClick', (() => {
      if (state.getWordSource().length === state.getWordUser().length) {
        state.updateUi({
          checkHidden: false,
          noKnowHidden: false,
        });
      }
      if (isArraysEqual(state.getWordSource(), state.getWordUser())) {
        state.updateUi({
          checkHidden: true,
          continueHidden: false,
          noKnowHidden: true,
        });
        state.setWordKnow(state.getWordSource());
      }
    }) as EventListener);

    buttonContinue.addEventListener('click', () => {
      buttonContinue.classList.add('hidden');
      state.updateUi({
        continueHidden: true,
        noKnowHidden: false,
      });
    });

    window.addEventListener(EventTypes.ChangeUI, () => {
      const stateUi = state.getUiState();
      if (stateUi.checkHidden) {
        buttonCheck.classList.add('hidden');
      } else {
        buttonCheck.classList.remove('hidden');
      }
      if (stateUi.continueHidden) {
        buttonContinue.classList.add('hidden');
      } else {
        buttonContinue.classList.remove('hidden');
      }
      if (stateUi.noKnowHidden) {
        buttonNoKnow.classList.add('hidden');
      } else {
        buttonNoKnow.classList.remove('hidden');
      }
    });

    // Result
    const buttonResult = new ButtonComponent('Result', () => this.testMethod()).createButton();
    buttonResult.classList.add('hidden');

    // Logout
    const buttonLogout = new ButtonComponent('Logout', () => dispatchCustomEvent('logout')).createButton();

    gameBoxButtons.append(buttonNoKnow, buttonCheck, buttonContinue, buttonResult, buttonLogout);
    gameBox.append(gameBoxHeader, gameBoxSoundHint, gameBoxResultBlock, gameBoxSourceBlock, gameBoxButtons);

    return gameBox;
  }

  public fillResultBlockRow = (): void => {
    state.updateUi({ noKnowHidden: true });
    state.setWordNoKnow(state.getWordSource());
    state.setWordUser([]);

    const wrapperSource = getElement(document.body, '.wrapper_source');
    wrapperSource.innerHTML = '';

    const element = getElementById<HTMLElement>(state.getRowCurrent().toString());
    element.innerHTML = '';

    const word = state.getWordSource().join(' ');
    const sentenceWithoutSpaces = word.replace(/\s/g, '');
    const countLettersOfSentence = sentenceWithoutSpaces.length;
    const arrayWords = word.split(' ');

    arrayWords.forEach((item) => {
      const countLettersOfWord = item.length;
      const densityWord = countLettersOfWord / countLettersOfSentence;

      const wrapperWord = document.createElement('div');
      const widthWrapperWord = Math.round(WIDTH_CONTAINER * densityWord);
      wrapperWord.style.width = `${widthWrapperWord}px`;
      wrapperWord.classList.add('wrapper_word');
      wrapperWord.innerText = item;
      element.append(wrapperWord);
    });

    state.updateUi({
      continueHidden: false,
      checkHidden: true,
    });
  };

  public testMethod(): void {
    console.log('testMethod');
  }
}
