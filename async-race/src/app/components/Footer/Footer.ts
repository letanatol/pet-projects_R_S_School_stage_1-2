import { createHTMLElement } from '@components/createHTMLElement';
import { state } from '@helpers/State';
import { EventTypes } from '@helpers/types';
import './footer.scss';

const FIRST_PAGE = 1;
const STEP = 1;
const COUNT_CARS_ON_PAGE = 7;
const START = 0;

export function createFooter(): HTMLElement {
  const container = createHTMLElement({ tagName: 'div', classNames: ['footer'] });
  const buttonPrevPage = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button-prev'],
    textContent: 'Prev',
  });

  const buttonNextPage = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button-next'],
    textContent: 'Next',
  });

  const stateButtons = state.getUiState();
  if (stateButtons.prevHidden) {
    buttonPrevPage.disabled = true;
  } else {
    buttonPrevPage.disabled = false;
  }

  if (stateButtons.nextHidden) {
    buttonNextPage.disabled = true;
  } else {
    buttonNextPage.disabled = false;
  }

  window.addEventListener(EventTypes.UpdateUI, () => {
    const stateUi = state.getUiState();
    if (stateUi.prevHidden) {
      buttonPrevPage.disabled = true;
    } else {
      buttonPrevPage.disabled = false;
    }

    if (stateUi.nextHidden) {
      buttonNextPage.disabled = true;
    } else {
      buttonNextPage.disabled = false;
    }
  });

  window.addEventListener(EventTypes.UpdateCountCars, () => {
    const countCars = state.getCountCars();
    const numberPage = state.getNumberPageGarage();
    let countPages = null;
    if (countCars % COUNT_CARS_ON_PAGE === START) {
      countPages = countCars / COUNT_CARS_ON_PAGE;
    } else {
      countPages = Math.floor(countCars / COUNT_CARS_ON_PAGE) + STEP;
    }

    if (numberPage === FIRST_PAGE) {
      state.updateUi({ prevHidden: true });
      state.updateUi({ nextHidden: true });

      // buttonPrevPage.disabled = true;
      // buttonNextPage.disabled = true;
    }

    if (countCars > COUNT_CARS_ON_PAGE && numberPage > FIRST_PAGE) {
      state.updateUi({ prevHidden: false });
      state.updateUi({ nextHidden: false });
      // buttonNextPage.disabled = false;
      // buttonPrevPage.disabled = false;
    }

    if (countPages > FIRST_PAGE) {
      state.updateUi({ nextHidden: false });
      // buttonNextPage.disabled = false;
    }

    if (countPages === numberPage) {
      state.updateUi({ nextHidden: true });
      // buttonNextPage.disabled = true;
    }
  });

  container.append(buttonPrevPage, buttonNextPage);
  return container;
}
