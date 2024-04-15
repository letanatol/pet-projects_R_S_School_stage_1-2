import { Footer } from '@components/Footer/Footer';
import './chatPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { Header } from '@components/Header/Header';
import { ChatUsers } from '@components/ChatUsers/ChatUsers';

export class ChatPage extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container_chat-page');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    const headerContainer = new Header().init();
    const footerContainer = new Footer().init();
    const chatUsersContainer = new ChatUsers().init();
    const chatContent = document.createElement('div');
    chatContent.classList.add('chat__content');
    chatContent.append(chatUsersContainer);
    this.container.append(headerContainer, chatContent, footerContainer);
    return this.container;
  }

  protected addEventListeners(): void {}
}
