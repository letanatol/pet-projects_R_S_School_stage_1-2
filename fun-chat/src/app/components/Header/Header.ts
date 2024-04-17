import './header.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { sessionStorageService } from '@helpers/sessionStorage';

export class Header extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('section');
    this.container.classList.add('header');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    const userFromStorage = sessionStorageService.getUserFromStorage('user');
    if (userFromStorage && userFromStorage.password) {
      this.container.innerHTML = `
      <div class="header__user-name"> User: 
        <span id="userName">${userFromStorage.login}</span>
      </div>
      <h1>Fun Chat</h1>
      <button class="button header__button-about" id="about">About</button>
      <button class="button header__button-logout" id="logout">Logout</>
    `;
    }

    return this.container;
  }

  protected addEventListeners(): void {}
}
