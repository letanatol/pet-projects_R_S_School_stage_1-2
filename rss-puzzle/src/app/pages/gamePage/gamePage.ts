export class GamePage {
  public drawGameContainer(): HTMLElement {
    const gameBox = document.createElement('div');
    gameBox.classList.add('game-box');

    return gameBox;
  }
}
