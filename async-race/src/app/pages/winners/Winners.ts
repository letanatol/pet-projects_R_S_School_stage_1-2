import { createHTMLElement } from '@components/createHTMLElement';
import { state } from '@helpers/State';
import { EventTypes } from '@helpers/types';

export class Winners {
  private winnersContainer: HTMLElement = createHTMLElement({ tagName: 'div', classNames: ['container-winners'] });

  public drawWinnersContainer(): HTMLElement {
    window.addEventListener(EventTypes.UpdateUI, () => {
      const uiState = state.getUiState();
      if (uiState.winnersHidden) {
        this.winnersContainer.classList.add('hidden');
      } else {
        this.winnersContainer.classList.remove('hidden');
      }
    });

    return this.winnersContainer;
  }
}
