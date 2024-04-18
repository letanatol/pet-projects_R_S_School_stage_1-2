import BaseComponent from '@components/BaseComponent/BaseComponent';
import './chatMessForm.scss';
import { state } from '@helpers/State/State';
import { getElement } from '@helpers/utils';

export class ChatMessForm extends BaseComponent {
  constructor() {
    super();
    this.form = document.createElement('form');
    this.form.classList.add('chat-field__form');
  }

  protected form: HTMLFormElement;

  protected draw(): HTMLElement {
    this.form.innerHTML = `
        <input class="chat-field__input" placeholder="Message..." disabled>
        <button type="submit" class="button chat-field__button" disabled>Send</button>
    `;

    return this.form;
  }

  protected addEventListeners(): void {
    this.form.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const inputChatField = getElement<HTMLInputElement>(document.body, '.chat-field__input');
      const message = inputChatField.value;
      state.updateMessage(message);
      inputChatField.value = '';
    });

    this.form.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.form.dispatchEvent(new Event('submit'));
      }
    });
  }
}
