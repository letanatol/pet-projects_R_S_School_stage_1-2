import { getElements } from './utils';

export function removeContent(selector: string): void {
  const elements = getElements<HTMLElement>(document.body, selector);
  const startIndex = 0;
  const step = 1;
  for (let i = startIndex; i < elements.length; i += step) {
    elements[i].innerHTML = '';
  }
}
