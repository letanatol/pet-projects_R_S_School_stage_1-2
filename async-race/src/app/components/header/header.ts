import './header.scss';
import { createHTMLElement } from '@components/createHTMLElement';

export function createHeader(): HTMLElement {
  const header = createHTMLElement('header', ['header']);
  const buttonToGarage = createHTMLElement('button', ['button', 'button__to-garage'], 'To garage');
  const buttonToWinners = createHTMLElement('button', ['button', 'button__to-winners'], 'To winners');

  header.append(buttonToGarage, buttonToWinners);

  return header;
}
