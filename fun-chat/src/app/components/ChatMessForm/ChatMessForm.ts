import BaseComponent from '@components/BaseComponent/BaseComponent';
import './chatMessForm.scss';
import { state } from '@helpers/State/State';
import { getElement, getElementById } from '@helpers/utils';
import { sessionStorageService } from '@helpers/sessionStorage';
import { EventTypes } from '@helpers/types';

export class ChatMessForm extends BaseComponent {
  constructor() {
    super();
    this.form = document.createElement('form');
    this.form.classList.add('chat-field__form');
  }

  protected form: HTMLFormElement;

  protected draw(): HTMLElement {
    this.form.innerHTML = `
        <input class="chat-field__input" id="chat-field__input" placeholder="Message..." disabled>
        <button type="submit" class="button chat-field__button" id="chat-field__button" disabled>Send</button>
    `;

    return this.form;
  }

  protected addEventListeners(): void {
    this.form.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const inputChatField = getElement<HTMLInputElement>(document.body, '.chat-field__input');
      const message = inputChatField.value.trim();
      if (message !== '') {
        state.updateMessage(message);
        inputChatField.value = '';

        const buttonChatField = getElementById<HTMLInputElement>('chat-field__button');
        buttonChatField.setAttribute('disabled', 'disabled');
      }

      if (sessionStorageService.getUserFromStorage('userForMessages')) {
        const userMessages = state.getMessageHistoryByCurrentUserNotRead();

        window.dispatchEvent(
          new CustomEvent(EventTypes.UpdateReadMessages, { bubbles: true, detail: { userMessages } })
        );
      }
    });

    this.form.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.form.dispatchEvent(new Event('submit'));
      }
    });
  }
}
