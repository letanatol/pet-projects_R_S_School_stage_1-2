import './garage.scss';
import { createControls } from '@components/controls/controls';
import { createHTMLElement } from '@components/createHTMLElement';
import { createPageInfoGarage } from '@components/pageInfo/pageInfoGarage';
import { state } from '@helpers/State';
import { EventTypes } from '@helpers/types';

export class Garage {
  private garageContainer: HTMLElement = createHTMLElement({ tagName: 'div', classNames: ['container-garage'] });

  public drawContainer(): HTMLElement {
    const controlsContainer = createControls();
    const pageInfoContainer = createPageInfoGarage();
    this.garageContainer.append(controlsContainer, pageInfoContainer);

    window.addEventListener(EventTypes.UpdateUI, () => {
      const uiState = state.getUiState();
      if (uiState.garageHidden) {
        this.garageContainer.classList.add('hidden');
      } else {
        this.garageContainer.classList.remove('hidden');
      }
    });

    return this.garageContainer;
  }
}
