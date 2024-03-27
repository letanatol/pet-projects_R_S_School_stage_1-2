import './pageInfo.scss';
import { createHTMLElement } from '@components/createHTMLElement';
import { state } from '@helpers/State';

export function createPageInfoGarage(): HTMLElement {
  const pageInfoContainer = createHTMLElement({ tagName: 'div', classNames: ['page-info__container'] });

  const infoCountCars = createHTMLElement({ tagName: 'div', classNames: ['info-cars'] });
  const infoCountCarsTitle = createHTMLElement({ tagName: 'h1', classNames: ['title'], textContent: 'Garage' });
  const countCars = state.getCountCars();
  const infoCountCarsTitleSpan = createHTMLElement({
    tagName: 'span',
    classNames: ['title-span'],
    textContent: `(${countCars})`,
  });
  infoCountCars.append(infoCountCarsTitle, infoCountCarsTitleSpan);

  const infoCountPages = createHTMLElement({ tagName: 'div', classNames: ['info-page'] });
  const infoCountPagesTitle = createHTMLElement({ tagName: 'h1', classNames: ['title'], textContent: 'Page' });
  const countPages = state.getCountPagesGarage();
  const infoCountPagesTitleSpan = createHTMLElement({
    tagName: 'span',
    classNames: ['title-span'],
    textContent: `#${countPages}`,
  });
  infoCountPages.append(infoCountPagesTitle, infoCountPagesTitleSpan);

  pageInfoContainer.append(infoCountCars, infoCountPages);

  return pageInfoContainer;
}
