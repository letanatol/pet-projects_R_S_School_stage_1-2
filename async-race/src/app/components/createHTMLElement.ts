import { HTMLElementType } from '@helpers/types';

const EMPTY_ARRAY = 0;

export function createHTMLElement(value: HTMLElementType): HTMLElement {
  const { tagName, classNames, textContent } = value;
  const element = document.createElement(tagName);
  if (classNames) {
    if (classNames.length > EMPTY_ARRAY) {
      classNames.forEach((className) => {
        element.classList.add(className);
      });
    }
  }

  if (textContent) {
    element.innerHTML = textContent;
  }

  return element;
}
