import { state } from '@helpers/State/State';
import './sourceBlock.scss';
import { shuffleArray } from '@helpers/shuffleArray';
import { EventTypes } from '@helpers/types';

const WIDTH_CONTAINER = 760;

export class SourceBlock {
  private wrapper: HTMLElement = document.createElement('div');

  private widthSourceBlock = WIDTH_CONTAINER;

  private word = state.getRowData().textExample;

  constructor() {
    window.addEventListener(EventTypes.ChangeLevel, () => {
      this.word = state.getRowData().textExample;
      this.fillWrapper();
    });
    window.addEventListener(EventTypes.ChangeRound, () => {
      this.word = state.getRowData().textExample;
      this.fillWrapper();
    });
  }

  private fillWrapper(): void {
    if (this.word) {
      this.wrapper.innerHTML = '';
      const sentenceWithoutSpaces: string = this.word.replace(/\s/g, '');
      const countLettersOfSentence: number = sentenceWithoutSpaces.length;
      const arrayWords = this.word.split(' ');
      const arrayWordsShuffled = shuffleArray(arrayWords);

      arrayWordsShuffled.forEach((word) => {
        const countLettersOfWord: number = word.length;
        const densityWord = countLettersOfWord / countLettersOfSentence;
        const wrapperWord = document.createElement('div');
        const widthWrapperWord = Math.round(this.widthSourceBlock * densityWord);
        wrapperWord.style.width = `${widthWrapperWord}px`;
        wrapperWord.classList.add('wrapper_word');
        wrapperWord.innerText = word;
        wrapperWord.setAttribute('draggable', 'true');
        this.wrapper.append(wrapperWord);
      });
    }
  }

  public getComponent(): HTMLElement {
    this.wrapper.classList.add('wrapper_source');

    this.wrapper.addEventListener('click', (event: Event) => {
      const { target } = event;

      if (target instanceof HTMLElement) {
        window.dispatchEvent(new CustomEvent('wordClick', { bubbles: true, detail: { word: target } }));
      }
    });

    this.fillWrapper();

    return this.wrapper;
  }
}
