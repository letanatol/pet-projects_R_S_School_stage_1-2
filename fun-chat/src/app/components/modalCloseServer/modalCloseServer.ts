import { EventTypes } from '@helpers/types';
import './modalCloseServer.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { state } from '@helpers/State/State';

export class Modal extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('modal');
  }

  private container: HTMLElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = `
        <div class="modal-content">
          <div class="spinner"></div>
          <p class="game-modal__text">Connecting to the server...</p>
        </div>
    `;

    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdateModalState, () => {
      const isModalHidden = state.getModalState();
      if (!isModalHidden) {
        this.container.classList.add('show');
      } else {
        this.container.classList.remove('show');
      }
    });
  }
}
