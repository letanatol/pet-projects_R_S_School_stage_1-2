import { HTMLElementType } from '@helpers/types';

const EMPTY_ARRAY = 0;

export function createHTMLElement<T extends keyof HTMLElementTagNameMap>(
  value: HTMLElementType
): HTMLElementTagNameMap[T] {
  const { tagName, classNames, textContent } = value;
  const element = document.createElement(tagName);
  if (classNames) {
    if (classNames.length > EMPTY_ARRAY) {
      element.classList.add(...classNames);
    }
  }

  if (textContent) {
    element.innerHTML = textContent;
  }

  return element as HTMLElementTagNameMap[T];
}
