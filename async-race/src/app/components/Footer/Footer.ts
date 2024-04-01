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
  buttonPrevPage.disabled = true;

  const buttonNextPage = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button-next'],
    textContent: 'Next',
  });
  buttonNextPage.disabled = true;

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
      buttonPrevPage.disabled = true;
      buttonNextPage.disabled = true;
    }

    if (countCars > COUNT_CARS_ON_PAGE && numberPage > FIRST_PAGE) {
      buttonNextPage.disabled = false;
      buttonPrevPage.disabled = false;
    }

    if (countPages > FIRST_PAGE) {
      buttonNextPage.disabled = false;
    }

    if (countPages === numberPage) {
      buttonNextPage.disabled = true;
    }
  });

  container.append(buttonPrevPage, buttonNextPage);
  return container;
}
