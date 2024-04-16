import './header.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { sessionStorageService } from '@helpers/sessionStorage';
import { state } from '@helpers/State/State';
import { UserType } from '@helpers/types';
import { chatApi } from 'src/app/api/socket';

export class Header extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('section');
    this.container.classList.add('header');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    const userFromStorage = this.getUserFromStorage();
    if (userFromStorage && userFromStorage.password) {
      this.container.innerHTML = `
      <div class="header__user-name"> User: 
        <span id="userName">${userFromStorage.login}</span>
      </div>
      <h1>Fun Chat</h1>
      <button class="button header__button-info" id="info">Info</button>
      <button class="button header__button-logout" id="logout">Logout</>
    `;
    }

    return this.container;
  }

  protected addEventListeners(): void {
    this.container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (!target || !target.classList) return;

      if (target.classList.contains('header__button-logout')) {
        const user = state.getUser();
        const userFromStorage = this.getUserFromStorage();
        if (userFromStorage && userFromStorage.password) {
          user.type = 'USER_LOGOUT';
          if (user.payload) {
            user.payload.user.login = userFromStorage.login;
            user.payload.user.password = userFromStorage.password;
            chatApi.wsSend(JSON.stringify(user));
            sessionStorageService.clearData();
            state.updatePage('login');
          }
        }
      } else if (target.classList.contains('header__button-info')) {
        state.updatePage('info');
      }
      this.draw();
    });
  }

  private getUserFromStorage(): UserType | null {
    const user = sessionStorageService.getData<UserType>('user');

    if (user) {
      return user;
    }

    return null;
  }
}
