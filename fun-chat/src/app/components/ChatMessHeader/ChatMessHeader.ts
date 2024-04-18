import { sessionStorageService } from '@helpers/sessionStorage';
import './chatMessHeader.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { EventTypes } from '@helpers/types';

export class ChatMessHeader extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('chat-messages__header');
  }

  protected container: HTMLSpanElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = '';

    return this.container;
  }

  protected drawWithUser(): HTMLElement {
    const userForMessagesFromStorage = sessionStorageService.getUserFromStorage('userForMessages');
    if (userForMessagesFromStorage && userForMessagesFromStorage.login) {
      let classForStatus = '';
      let statusText = '';
      if (userForMessagesFromStorage.isLogined) {
        classForStatus = 'user_active';
        statusText = 'online';
      } else {
        classForStatus = 'user_inactive';
        statusText = 'offline';
      }

      this.container.innerHTML = `
        <span id="userForMessages">User: ${userForMessagesFromStorage.login}</span>
        <div class=${classForStatus}>${statusText}</div>
    `;
    }

    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdateUserForMessages, () => {
      this.drawWithUser();
    });
  }
}
