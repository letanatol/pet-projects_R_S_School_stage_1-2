import { ButtonComponent } from '@components/buttonComponent';
import { dispatchCustomEvent } from '@helpers/dispatchCustomEvent';

import './startPage.scss';

export class StartPage {
  public drawStartContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('container');

    const logoutButton = new ButtonComponent('Logout', () => dispatchCustomEvent('logout')).createButton();

    container.append(logoutButton);

    return container;
  }
}
