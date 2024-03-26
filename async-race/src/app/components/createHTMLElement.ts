const EMPTY_ARRAY = 0;

export function createHTMLElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  classNames?: string[],
  text?: string
): HTMLElementTagNameMap[T] {
  const element = document.createElement(tagName);
  if (classNames) {
    if (classNames.length > EMPTY_ARRAY) {
      classNames.forEach((className) => {
        element.classList.add(className);
      });
    }
  }

  if (text) {
    element.innerHTML = text;
  }

  return element;
}
