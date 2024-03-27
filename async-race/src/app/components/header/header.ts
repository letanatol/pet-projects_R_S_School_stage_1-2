import { state } from '@helpers/State';
import './header.scss';
import { createHTMLElement } from '@components/createHTMLElement';
import { EventTypes } from '@helpers/types';

export function createHeader(): HTMLElement {
  const header = createHTMLElement({ tagName: 'header', classNames: ['header'] });
  // BUTTON GARAGE
  const buttonToGarage = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button__to-garage'],
    textContent: 'To garage',
  });
  buttonToGarage.disabled = true;
  buttonToGarage.addEventListener('click', () => {
    const uiState = state.getUiState();
    if (uiState.garageHidden) {
      state.updateUi({ garageHidden: false, winnersHidden: true });
    } else {
      state.updateUi({ garageHidden: true, winnersHidden: false });
    }
  });

  // BUTTON WINNERS
  const buttonToWinners = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button__to-winners'],
    textContent: 'To winners',
  });
  buttonToWinners.disabled = false;
  buttonToWinners.addEventListener('click', () => {
    const uiState = state.getUiState();
    if (uiState.winnersHidden) {
      state.updateUi({ winnersHidden: false, garageHidden: true });
    } else {
      state.updateUi({ winnersHidden: true, garageHidden: false });
    }
  });

  header.append(buttonToGarage, buttonToWinners);

  window.addEventListener(EventTypes.UpdateUI, () => {
    const uiState = state.getUiState();
    if (uiState.garageHidden) {
      buttonToGarage.disabled = false;
      buttonToWinners.disabled = true;
    } else {
      buttonToGarage.disabled = true;
      buttonToWinners.disabled = false;
    }
  });

  return header;
}
