import { createHTMLElement } from '@components/createHTMLElement';
import { carSvg } from '@components/track/carSvg';
import { WinnerType } from '@helpers/types';

const LENGTH = 0;

export function createWinner(winner: WinnerType, number: number): HTMLElement {
  const { name, color, id, wins, time } = winner;

  const tableRow = createHTMLElement({ tagName: 'div', classNames: ['table-row'] });
  const rowNumber = createHTMLElement({ tagName: 'div', classNames: ['td', 'td-number'], textContent: `${number}` });
  const rowCar = createHTMLElement({ tagName: 'div', classNames: ['td', 'td-car'] });
  const carImage = createHTMLElement({ tagName: 'div', classNames: ['car-image'] });
  carImage.innerHTML = carSvg;

  const svgs = carImage.querySelectorAll('svg');
  if (svgs.length > LENGTH) {
    svgs.forEach((svg) => {
      const currentSvg = svg;
      currentSvg.style.fill = color;
    });
  }
  carImage.dataset.car = `${id}`;
  rowCar.append(carImage);

  const rowName = createHTMLElement({ tagName: 'div', classNames: ['td', 'td-name'], textContent: `${name}` });
  const rowWins = createHTMLElement({ tagName: 'div', classNames: ['td', 'td-wins'], textContent: `${wins}` });
  const rowTime = createHTMLElement({ tagName: 'div', classNames: ['td', 'td-time'], textContent: `${time}` });
  tableRow.append(rowNumber, rowCar, rowName, rowWins, rowTime);
  return tableRow;
}
