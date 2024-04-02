import './header.scss';
import { State } from '@helpers/State';
import BaseComponent from '../BaseComponent/BaseComponent';

export class Header extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = document.createElement('header');
    this.container.classList.add('header');
    this.state = state;
  }

  protected container: HTMLElement;

  private state: State;

  protected draw(): HTMLElement {
    this.container.innerHTML = `
    <button class="button button__to-garage" ${this.state.getPage() === 'garage' ? 'disabled' : ''}>To garage</button>
    <button class="button button__to-winners" ${this.state.getPage() === 'winners' ? 'disabled' : ''}>To winners</button>
`;
    return this.container;
  }

  protected addEventListeners(): void {
    this.container.addEventListener('click', (event: Event) => {
      this.state.getState();
      const target = event.target as HTMLElement;

      if (!target || !target.classList) return;

      if (target.classList.contains('button__to-garage')) {
        this.state.updatePage('garage');
      } else if (target.classList.contains('button__to-winners')) {
        this.state.updatePage('winners');
      }
      this.draw();
    });
  }
}
