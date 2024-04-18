import { Footer } from '@components/Footer/Footer';
import './chatPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { Header } from '@components/Header/Header';
import { ChatUsers } from '@components/ChatUsers/ChatUsers';
import { ChatMessHeader } from '@components/ChatMessHeader/ChatMessHeader';

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
    const footerContainer = new Footer().init();

    chatMessages.append(chatMessHeader);
    chatContent.append(chatUsersContainer, chatMessages);
    this.container.append(headerContainer, chatContent, footerContainer);
    return this.container;
  }

  protected addEventListeners(): void {}
}
