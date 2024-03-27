import './pageInfo.scss';
import { createHTMLElement } from '@components/createHTMLElement';
import { state } from '@helpers/State';

export function createPageInfoWinners(): HTMLElement {
  const pageInfoContainer = createHTMLElement({ tagName: 'div', classNames: ['page-info__container'] });

  const infoCountWinners = createHTMLElement({ tagName: 'div', classNames: ['info-winners'] });
  const infoCountWinnersTitle = createHTMLElement({ tagName: 'h1', classNames: ['title'], textContent: 'Winners' });
  const countWinners = state.getCountWinners();
  const infoCountWinnersTitleSpan = createHTMLElement({
    tagName: 'span',
    classNames: ['title-span'],
    textContent: `(${countWinners})`,
  });
  infoCountWinners.append(infoCountWinnersTitle, infoCountWinnersTitleSpan);

  const infoCountPages = createHTMLElement({ tagName: 'div', classNames: ['info-page'] });
  const infoCountPagesTitle = createHTMLElement({ tagName: 'h1', classNames: ['title'], textContent: 'Page' });
  const countPages = state.getCountPagesWinners();
  const infoCountPagesTitleSpan = createHTMLElement({
    tagName: 'span',
    classNames: ['title-span'],
    textContent: `#${countPages}`,
  });
  infoCountPages.append(infoCountPagesTitle, infoCountPagesTitleSpan);

  pageInfoContainer.append(infoCountWinners, infoCountPages);

  return pageInfoContainer;
}
