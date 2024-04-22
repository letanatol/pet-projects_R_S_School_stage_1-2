import BaseComponent from '@components/BaseComponent/BaseComponent';
import './chatMessField.scss';
import { state } from '@helpers/State/State';
import { EventTypes } from '@helpers/types';
import { chatApi } from 'src/app/api/socket';
import { getElementById } from '@helpers/utils';
import { sessionStorageService } from '@helpers/sessionStorage';

const LENGTH_MESSAGE = 0;

export class ChatMessField extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('chat-field__messages');
    this.contextMenu = document.createElement('ul');
  }

  protected container: HTMLElement;

  protected contextMenu: HTMLUListElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = '';
    this.container.innerHTML = `<div class="message_hint">Select the user to send the message...</div>`;
    return this.container;
  }

  protected drawMessageField(): HTMLElement {
    this.container.innerHTML = '';
    const currentUser = sessionStorageService.getUserFromStorage('user');
    const messagesHistory = state.getMessageHistoryByCurrentUser();

    if (Object.keys(messagesHistory).length === LENGTH_MESSAGE) {
      this.container.innerHTML = `<div class="message_hint">Write your first message...</div>`;
    }

    const sortedMessages = Object.entries(messagesHistory);

    sortedMessages.forEach(([messageId, message]) => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message_container');
      messageDiv.id = messageId;

      const messageContent = document.createElement('div');
      messageContent.classList.add('message__content');

      const headerDiv = document.createElement('div');
      headerDiv.classList.add('message__header');

      const senderLabel = document.createElement('label');
      senderLabel.classList.add('message__sender');

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

      const statusLabel = document.createElement('label');
      statusLabel.classList.add('message__status');

      if (message.from !== undefined && message.from === currentUser?.login) {
        senderLabel.textContent = 'You';
        messageDiv.classList.add('message__right');
        statusLabel.textContent = message.status.isDelivered ? 'Delivered' : 'Sent';

        if (message.status.isReaded) {
          statusLabel.textContent = 'Read';
        }
      } else {
        senderLabel.textContent = message.from ?? '';
        messageDiv.classList.add('message__left');
      }

      footerDiv.append(editedLabel, statusLabel);

      messageContent.append(headerDiv, textDiv, footerDiv);
      messageDiv.append(messageContent);

      this.container.append(messageDiv);
    });

    this.container.scrollTop = this.container.scrollHeight;

    this.contextMenu.classList.add('context-menu');
    this.contextMenu.id = 'contextMenu';
    this.contextMenu.style.display = 'none';
    this.contextMenu.innerHTML = `
      <li class="context-menu__item edit-message">Edit</li>
      <li class="context-menu__item delete-message">Delete</li>
    `;

    this.container.append(this.contextMenu);
    return this.container;
  }

  protected addEventListeners(): void {
    this.container.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const target = event.target as HTMLElement;

      const messageSender = target.closest('.message_container')?.querySelector('.message__sender');
      if (messageSender && messageSender.textContent === 'You') {
        this.contextMenu.style.display = 'block';
        const rect = this.container.getBoundingClientRect();
        const offsetX = event.pageX - rect.left;
        const offsetY = event.pageY - rect.top;
        this.contextMenu.style.left = `${offsetX}px`;
        this.contextMenu.style.top = `${offsetY}px`;

        if (target.closest('.message_container')) {
          const messageContainer = target.closest('.message_container');
          if (messageContainer) {
            const messageId = messageContainer.id;
            state.updateMessageID(messageId);
          }
        }
      }
    });

    this.container.addEventListener('scroll', () => {
      if (sessionStorageService.getUserFromStorage('userForMessages')) {
        const userMessages = state.getMessageHistoryByCurrentUserNotRead();
        window.dispatchEvent(
          new CustomEvent(EventTypes.UpdateReadMessages, { bubbles: true, detail: { userMessages } })
        );
      }
    });

    this.container.addEventListener('click', () => {
      if (sessionStorageService.getUserFromStorage('userForMessages')) {
        const userMessages = state.getMessageHistoryByCurrentUserNotRead();

        window.dispatchEvent(
          new CustomEvent(EventTypes.UpdateReadMessages, { bubbles: true, detail: { userMessages } })
        );
      }
    });

    this.contextMenu.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target || !target.classList) return;

      if (target.classList.contains('delete-message')) {
        const requestDeleteMessage = {
          id: '',
          type: 'MSG_DELETE',
          payload: {
            message: {
              id: '',
            },
          },
        };
        requestDeleteMessage.payload.message.id = state.getMessageID();
        chatApi.wsSend(JSON.stringify(requestDeleteMessage));
      }

      if (target.classList.contains('edit-message')) {
        const messageId = state.getMessageID();
        const messageDiv = getElementById(messageId);
        const textMessage = messageDiv.querySelector('.message__text')?.textContent;
        const inputChatField = getElementById<HTMLInputElement>('chat-field__input');
        const buttonChatField = getElementById<HTMLInputElement>('chat-field__button');
        if (textMessage) {
          inputChatField.value = textMessage;
          inputChatField.focus();
          if (inputChatField.value.trim().length > LENGTH_MESSAGE) {
            buttonChatField.removeAttribute('disabled');
          } else {
            buttonChatField.setAttribute('disabled', 'disabled');
          }
        }
      }
    });

    window.addEventListener(EventTypes.UpdateUserForMessages, (() => {
      this.drawMessageField();
    }) as EventListener);

    window.addEventListener(EventTypes.UpdateMessagesHistory, (() => {
      if (sessionStorageService.getUserFromStorage('userForMessages')) {
        this.drawMessageField();
      }
    }) as EventListener);

    window.addEventListener('click', () => {
      this.contextMenu.style.display = 'none';
    });
  }
}
