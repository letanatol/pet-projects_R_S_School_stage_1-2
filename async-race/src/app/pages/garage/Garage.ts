import BaseComponent from '@components/BaseComponent/BaseComponent';
import './garage.scss';
import { createControls } from '@components/controls/controls';
import { createHTMLElement } from '@components/createHTMLElement';
import { createPageInfoGarage } from '@components/pageInfo/pageInfoGarage';
import { State } from '@helpers/State';

export class Garage extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = createHTMLElement({ tagName: 'div', classNames: ['container-garage'] });
    this.state = state;
  }

  protected container: HTMLElement;

  private state: State;

  protected draw(): HTMLElement {
    const controlsContainer = createControls();
    const pageInfoContainer = createPageInfoGarage();
    this.container.append(controlsContainer, pageInfoContainer);

    return this.container;
  }

  protected addEventListeners(): void {
    console.log('I will listen to customEvents for Garage', this.state);
  }
}
