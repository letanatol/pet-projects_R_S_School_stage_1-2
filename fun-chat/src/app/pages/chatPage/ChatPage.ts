import { Footer } from '@components/Footer/Footer';
import './chatPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { Header } from '@components/Header/Header';
import { ChatUsers } from '@components/ChatUsers/ChatUsers';
import { ChatMessHeader } from '@components/ChatMessHeader/ChatMessHeader';
import { ChatMessField } from '@components/ChatMessField/ChatMessField';
import { sessionStorageService } from '@helpers/sessionStorage';
import { state } from '@helpers/State/State';
import { getElement } from '@helpers/utils';
import { ChatMessForm } from '@components/ChatMessForm/ChatMessForm';

const LENGTH_MESSAGE = 0;

export class ChatPage extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container_chat-page');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    const headerContainer = new Header().init();
    const chatContent = document.createElement('div');
    chatContent.classList.add('chat__content');
    const chatUsersContainer = new ChatUsers().init();
    const chatMessages = document.createElement('div');
    chatMessages.classList.add('chat-messages');
    const chatMessHeader = new ChatMessHeader().init();
    const chatMessField = new ChatMessField().init();
    const chatMessForm = new ChatMessForm().init();
    const footerContainer = new Footer().init();

    chatMessages.append(chatMessHeader, chatMessField, chatMessForm);
    chatContent.append(chatUsersContainer, chatMessages);
    this.container.append(headerContainer, chatContent, footerContainer);
    return this.container;
  }

  protected addEventListeners(): void {
    this.container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target || !target.classList) return;

      const inputChatField = getElement<HTMLInputElement>(document.body, '.chat-field__input');
      const buttonChatField = getElement<HTMLButtonElement>(document.body, '.chat-field__button');

      if (target.classList.contains('user-row')) {
        const userRows = document.querySelectorAll('.user-row');
        userRows.forEach((row) => {
          row.classList.remove('user__for-message');
        });
        target.classList.add('user__for-message');
        const label = target.querySelector('.user-login') as HTMLElement;
        const classActive = target.querySelector('.active') as HTMLElement;
        const classInactive = target.querySelector('.inactive') as HTMLElement;
        let isLogined = false;
        if (classActive) {
          isLogined = true;
        }

        if (classInactive) {
          isLogined = false;
        }
        if (label) {
          const login = label.textContent as string;
          sessionStorageService.saveData('userForMessages', { login, isLogined });
          state.updateUserForMessages({ login, isLogined });
          // ! Сделать запрос на сервер на переписку с этим user и если пусто, то
        }

        inputChatField.removeAttribute('disabled');
      }

      inputChatField.addEventListener('input', () => {
        if (inputChatField.value.trim().length > LENGTH_MESSAGE) {
          buttonChatField.removeAttribute('disabled');
        } else {
          buttonChatField.setAttribute('disabled', 'disabled');
        }
      });
    });
  }
}
