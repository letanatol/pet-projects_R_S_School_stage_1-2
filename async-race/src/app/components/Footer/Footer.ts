import { createHTMLElement } from '@components/createHTMLElement';

export function createFooter(): HTMLElement {
  const container = createHTMLElement({ tagName: 'div', classNames: ['footer'] });
  const buttonPrevPage = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-prev'],
    textContent: 'Prev',
  });
  const buttonNextPage = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-next'],
    textContent: 'Next',
  });

  container.append(buttonPrevPage, buttonNextPage);
  return container;
}
