import './chatUsers.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { EventTypes } from '@helpers/types';
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

    const usersActiveList = state.getUsersActive();
    const userFromStorage = sessionStorageService.getUserFromStorage('user');
    const userMessageFromStorage = sessionStorageService.getUserFromStorage('userForMessages');
    const userForMessages = userMessageFromStorage?.login;

    if (!userFromStorage || !userFromStorage.login) {
      return usersList;
    }
    if (!userMessageFromStorage || !userMessageFromStorage.login) {
      console.log('No active user for message');
    }

    usersActiveList.forEach((userActive) => {
      const { login } = userActive;
      if (login !== userFromStorage.login) {
        const li = document.createElement('li');
        li.classList.add('user-row');
        if (login === userForMessages) {
          li.classList.add('user__for-message');
        }
        li.innerHTML = `
            <div class="user-status active"></div>
            <label class="user-login">${login}</label>
          `;
        usersList.append(li);
      }
    });

    const usersInactiveList = state.getUsersInactive();

    usersInactiveList.forEach((userInactive) => {
      const { login } = userInactive;
      if (login !== userFromStorage.login) {
        const li = document.createElement('li');
        li.classList.add('user-row');
        if (login === userForMessages) {
          li.classList.add('user__for-message');
        }
        li.innerHTML = `
        <div class="user-status inactive"></div>
        <label class="user-login">${login}</label>
      `;
        usersList.append(li);
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
}
