import './chatPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';

export class ChatPage extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container_chat-page');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = `
      <div class="row_chat-page">Привет ChatPage</div>
`;
    return this.container;
  }

  protected addEventListeners(): void {}
}
