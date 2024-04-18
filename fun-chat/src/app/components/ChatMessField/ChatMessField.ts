import BaseComponent from '@components/BaseComponent/BaseComponent';
import './chatMessField.scss';
import { state } from '@helpers/State/State';
import { EventTypes } from '@helpers/types';
import { sessionStorageService } from '@helpers/sessionStorage';

export class ChatMessField extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('chat-field__messages');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    const currentUser = sessionStorageService.getUserFromStorage('user');
    const messagesHistory = state.getMessagesHistory();
    this.container.innerHTML = '';

    messagesHistory.forEach((message) => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message_container');

      const messageContent = document.createElement('div');
      messageContent.classList.add('message__content');

      const headerDiv = document.createElement('div');
      headerDiv.classList.add('message__header');

      const senderLabel = document.createElement('label');
      senderLabel.classList.add('message__sender');
      // senderLabel.textContent = message.from === currentUser?.login ? 'You' : message.from;
      if (message.from === currentUser?.login) {
        senderLabel.textContent = 'You';
        messageDiv.classList.add('message__right');
      } else {
        senderLabel.textContent = message.from;
        messageDiv.classList.add('message__left');
      }

      const dateLabel = document.createElement('label');
      dateLabel.classList.add('message__data');
      const date = new Date(message.datetime);
      dateLabel.textContent = date.toLocaleString();
      headerDiv.append(senderLabel, dateLabel);

      const textDiv = document.createElement('div');
      textDiv.classList.add('message__text');
      textDiv.textContent = message.text;

      const footerDiv = document.createElement('div');
      footerDiv.classList.add('message__footer');

      const editedLabel = document.createElement('label');
      editedLabel.classList.add('message__edit');
      editedLabel.textContent = message.status.isEdited ? 'Edited' : '';

      const readLabel = document.createElement('label');
      readLabel.classList.add('message__read');
      readLabel.textContent = message.status.isReaded ? 'Readed' : '';
      footerDiv.append(editedLabel, readLabel);

      messageContent.append(headerDiv, textDiv, footerDiv);
      messageDiv.append(messageContent);

      this.container.appendChild(messageDiv);
    });

    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdateMessagesHistory, () => {
      this.draw();
    });
  }
}
