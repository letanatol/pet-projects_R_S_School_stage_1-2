import './mainContainer.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { state } from '@helpers/State/State';
import { EventTypes } from '@helpers/types';
import { ChatPage } from 'src/app/pages/chatPage/ChatPage';
import { LoginPage } from 'src/app/pages/loginPage/LoginPage';

export class MainContainer extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('main');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    const currentPage = state.getPage();
    this.container.innerHTML = '';
    if (currentPage === 'loginPage' || currentPage === '') {
      const containerLoginPage = new LoginPage().init();
      this.container.append(containerLoginPage);
    }
    if (currentPage === 'chatPage') {
      const containerChatPage = new ChatPage().init();
      this.container.append(containerChatPage);
    }
    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdatePage, () => {
      this.draw();
    });
  }
}
