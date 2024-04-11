import { Footer } from '@components/Footer/Footer';
import './chatPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { Header } from '@components/Header/Header';

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

    this.container.append(headerContainer, footerContainer);
    return this.container;
  }

  protected addEventListeners(): void {}
}
