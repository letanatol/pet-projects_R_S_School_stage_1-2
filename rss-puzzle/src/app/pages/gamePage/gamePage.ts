import './gamePage.scss';
import { SourceBlock } from '@components/sourceBlock/sourceBlock';
import { getElementById } from '@helpers/utils';

export class GamePage {
  private idRound: string = '1_00';

  public drawGameContainer(): HTMLElement {
    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');

    // RESULT
    const gameBoxResultBlock = document.createElement('div');
    gameBoxResultBlock.classList.add('result-block');
    const startIndex = 0;
    const countDiv = 10;
    const step = 1;
    for (let i = startIndex; i < countDiv; i += step) {
      const rowResultBlock = document.createElement('div');
      rowResultBlock.classList.add('row__result-block');
      rowResultBlock.id = `0${i}`;
      gameBoxResultBlock.appendChild(rowResultBlock);
    }

    // SOURCE
    const gameBoxSourceBlock = document.createElement('div');
    gameBoxSourceBlock.classList.add('source-block');

    const testSourceBlock = new SourceBlock().getComponent();
    gameBoxSourceBlock.append(testSourceBlock);

    window.addEventListener('wordClick', ((event: CustomEvent<{ word: HTMLElement }>) => {
      const idForDiv = this.idRound.split('_')[1];
      const element = getElementById<HTMLElement>(idForDiv);
      if (element) {
        element.append(event.detail.word);
      }
    }) as EventListener);

    gameBox.append(gameBoxResultBlock, gameBoxSourceBlock);

    return gameBox;
  }

  public testMethod(): void {
    console.log('testMethod');
  }
}
