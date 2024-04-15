import './chatUsers.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { EventTypes, UserType } from '@helpers/types';
import { state } from '@helpers/State/State';
import { sessionStorageService } from '@helpers/sessionStorage';

export class ChatUsers extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('chat-users');
    this.inputSearch = document.createElement('input');
    this.inputSearch = document.createElement('input');
    this.inputSearch.placeholder = 'Search...';
  }

  protected container: HTMLElement;

  protected inputSearch: HTMLInputElement;

  protected draw(): HTMLElement {
    const usersList = document.createElement('ul');
    usersList.classList.add('users-list');

    const usersActive = state.getUsersActive();
    const userFromStorage = this.getUserFromStorage();
    if (!userFromStorage || !userFromStorage.login) {
      return usersList;
    }
    usersActive.forEach((user) => {
      const { login } = user;
      if (login !== userFromStorage.login) {
        const userDiv = document.createElement('li');
        userDiv.classList.add('user-row');
        userDiv.innerHTML = `
            <div class="user-status active"></div>
            <label class="user-login">${login}</label>
          `;
        usersList.append(userDiv);
      }
    });

    const usersInactive = state.getUsersInactive();

    usersInactive.forEach((user) => {
      const { login } = user;
      if (login !== userFromStorage.login) {
        const userDiv = document.createElement('li');
        userDiv.classList.add('user-row');
        userDiv.innerHTML = `
        <div class="user-status inactive"></div>
        <label class="user-login">${login}</label>
      `;
        usersList.append(userDiv);
      }
    });

    this.container.innerHTML = '';
    this.container.append(this.inputSearch, usersList);
    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdateUsersActive, () => {
      this.draw();
    });
    window.addEventListener(EventTypes.UpdateUsersInactive, () => {
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
