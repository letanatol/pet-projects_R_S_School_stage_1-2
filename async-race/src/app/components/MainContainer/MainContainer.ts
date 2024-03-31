import BaseComponent from '@components/BaseComponent/BaseComponent';
import { State } from '@helpers/State';
import { EventTypes } from '@helpers/types';
import { Garage } from 'src/app/pages/garage/Garage';
import { Winners } from 'src/app/pages/winners/Winners';

export class MainContainer extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = document.createElement('main');
    this.state = state;
  }

  protected container: HTMLElement;

  private state: State;

  protected draw(): HTMLElement {
    const containerGarage = new Garage(this.state).init();
    this.container.append(containerGarage);
    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdatePage, () => {
      this.container.innerHTML = '';
      const updatePage = this.state.getPage();
      if (updatePage === 'garage') {
        const containerGarage = new Garage(this.state).init();
        this.container.append(containerGarage);
      }

      if (updatePage === 'winners') {
        const containerWinners = new Winners(this.state).init();
        this.container.append(containerWinners);
      }
    });
  }
}
