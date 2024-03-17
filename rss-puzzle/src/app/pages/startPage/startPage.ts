import { UserType } from '@helpers/types';
import { ButtonComponent } from '@components/buttonComponent';
import { dispatchCustomEvent } from '@helpers/dispatchCustomEvent';
import { localStorageService } from '../../helpers/localStorage';
import { GamePage } from '../gamePage/gamePage';

import './startPage.scss';

export class StartPage {
  constructor(private mainContainer: HTMLElement) {}

  public drawStartContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('container');

    const title = document.createElement('h1');
    title.textContent = 'English Puzzle';
    title.classList.add('title_login');

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = `RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. Assemble sentences from jumbled words, inspired by Lingualeo's Phrase Constructor training. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork. Click on words, collect phrases. Words can be drag and drop. Select tooltips.`;

    const greeting = document.createElement('p');
    greeting.classList.add('greeting');

    const savedUser = localStorageService.getData<UserType>('user');

    if (savedUser) {
      const { name, surname } = savedUser;
      greeting.textContent = `Welcome back, ${name} ${surname}!`;
    }

    const startButton = new ButtonComponent('Start', () => this.handleGame()).createButton();
    const logoutButton = new ButtonComponent('Logout', () => dispatchCustomEvent('logout')).createButton();

    container.append(title, description, greeting, startButton, logoutButton);

    return container;
  }

  private handleGame(): void {
    const startPage = new GamePage();
    const startPageContainer = startPage.drawGameContainer();
    this.mainContainer.innerHTML = '';
    this.mainContainer.append(startPageContainer);
  }
}
