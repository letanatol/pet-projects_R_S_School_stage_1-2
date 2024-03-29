import BaseComponent from '@components/BaseComponent/BaseComponent';
import { createHTMLElement } from '@components/createHTMLElement';
import { createPageInfoWinners } from '@components/pageInfo/pageInfoWinners';
import { State } from '@helpers/State';
// import { state } from '@helpers/State';
// import { EventTypes } from '@helpers/types';

export class Winners extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = createHTMLElement({ tagName: 'div', classNames: ['container-winners'] });
    this.state = state;
  }

  protected container: HTMLElement;

  protected state: State;

  public draw(): HTMLElement {
    const pageInfoContainer = createPageInfoWinners();
    this.container.append(pageInfoContainer);

    return this.container;
  }

  protected addEventListeners(): void {
    console.log('I will listen to customEvents for Winners', this.state);
  }
}
