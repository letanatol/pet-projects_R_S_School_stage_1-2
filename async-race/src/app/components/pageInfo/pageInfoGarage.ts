import './pageInfo.scss';
import { createHTMLElement } from '@components/createHTMLElement';

export function createInfoCountCars(count: number): HTMLElement {
  const infoCountCars = createHTMLElement({ tagName: 'div', classNames: ['info-cars'] });
  const infoCountCarsTitle = createHTMLElement({ tagName: 'h1', classNames: ['title'], textContent: 'Garage' });

  const infoCountCarsTitleSpan = createHTMLElement({
    tagName: 'span',
    classNames: ['title-span'],
    textContent: `(${count})`,
  });
  infoCountCarsTitleSpan.id = 'count-cars';
  infoCountCars.append(infoCountCarsTitle, infoCountCarsTitleSpan);

  return infoCountCars;
}

export function createInfoNumberPage(count: number): HTMLElement {
  const infoNumberPage = createHTMLElement({ tagName: 'div', classNames: ['info-page'] });
  const infoNumberPageTitle = createHTMLElement({ tagName: 'h1', classNames: ['title'], textContent: 'Page' });

  const infoNumberPageTitleSpan = createHTMLElement({
    tagName: 'span',
    classNames: ['title-span'],
    textContent: `#${count}`,
  });
  infoNumberPageTitleSpan.id = 'number-page_garage';
  infoNumberPage.append(infoNumberPageTitle, infoNumberPageTitleSpan);

  return infoNumberPage;
}
