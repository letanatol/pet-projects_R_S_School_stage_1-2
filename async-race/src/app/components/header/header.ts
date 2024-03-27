import './header.scss';
import { createHTMLElement } from '@components/createHTMLElement';

export function createHeader(onGarageButtonClick: () => void, onWinnersButtonClick: () => void): HTMLElement {
  const header = createHTMLElement({ tagName: 'header', classNames: ['header'] });
  const buttonToGarage = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button__to-garage'],
    textContent: 'To garage',
  });
  buttonToGarage.addEventListener('click', onGarageButtonClick);

  const buttonToWinners = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button__to-winners'],
    textContent: 'To winners',
  });
  buttonToWinners.addEventListener('click', onWinnersButtonClick);
  header.append(buttonToGarage, buttonToWinners);

  return header;
}
