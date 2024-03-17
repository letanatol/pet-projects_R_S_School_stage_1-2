import { UserType } from '@helpers/types';
import { ButtonComponent } from '@components/buttonComponent';
import { dispatchCustomEvent } from '@helpers/dispatchCustomEvent';
import { localStorageService } from '../../helpers/localStorage';

import './startPage.scss';

export class StartPage {
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

    const logoutButton = new ButtonComponent('Logout', () => dispatchCustomEvent('logout')).createButton();

    container.append(title, description, greeting, logoutButton);

    return container;
  }
}
