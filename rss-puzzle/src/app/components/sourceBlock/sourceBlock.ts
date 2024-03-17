import { state } from '@helpers/State/State';
import './sourceBlock.scss';
import { shuffleArray } from '@helpers/shuffleArray';
import { EventTypes } from '@helpers/types';

export class SourceBlock {
  private wrapper: HTMLElement = document.createElement('div');

  private word = state.getRowData().textExample;

  constructor() {
    window.addEventListener(EventTypes.ChangeRound, () => {
      this.word = state.getRowData().textExample;
      this.fillWrapper();
    });
  }

  private fillWrapper(): void {
    if (this.word) {
      this.wrapper.innerHTML = '';
      const arrayWords = this.word.split(' ');
      const arrayWordsShuffled = shuffleArray(arrayWords);

      arrayWordsShuffled.forEach((word) => {
        const wrapperWord = document.createElement('div');
        wrapperWord.classList.add('wrapper_word');
        wrapperWord.innerText = word;
        wrapperWord.setAttribute('draggable', 'true');
        this.wrapper.append(wrapperWord);
      });
    }
  }

  public getComponent(): HTMLElement {
    this.wrapper.classList.add('wrapper');

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
