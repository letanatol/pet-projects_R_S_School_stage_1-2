export const getElement = <T extends HTMLElement>(root: HTMLElement, selector: string): T => {
  const element = root.querySelector<T>(selector);

  if (!element) {
    throw new TypeError(`Element not found: ${selector}`);
  }

  return element;
};

export const getElementById = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id) as T;

  if (!element) {
    throw new TypeError(`Element not found: ${id}`);
  }

  return element;
};

export const getElements = <T extends HTMLElement>(root: HTMLElement, selector: string): NodeListOf<T> => {
  const elements = root.querySelectorAll<T>(selector);

  if (!elements) {
    throw new TypeError(`Element not found: ${selector}`);
  }

  return elements;
};
