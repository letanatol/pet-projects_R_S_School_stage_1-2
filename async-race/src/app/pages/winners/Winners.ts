import { createHTMLElement } from '@components/createHTMLElement';
import { createPageInfoWinners } from '@components/pageInfo/pageInfoWinners';
import { state } from '@helpers/State';
import { EventTypes } from '@helpers/types';

export class Winners {
  private winnersContainer: HTMLElement;

  constructor() {
    this.winnersContainer = createHTMLElement({ tagName: 'div', classNames: ['container-winners'] });
    this.winnersContainer.classList.add('hidden');
  }

  public drawWinnersContainer(): HTMLElement {
    const pageInfoContainer = createPageInfoWinners();

    window.addEventListener(EventTypes.UpdateUI, () => {
      const uiState = state.getUiState();
      if (uiState.winnersHidden) {
        this.winnersContainer.classList.add('hidden');
      } else {
        this.winnersContainer.classList.remove('hidden');
      }
    });

    this.winnersContainer.append(pageInfoContainer);

    return this.winnersContainer;
  }
}
