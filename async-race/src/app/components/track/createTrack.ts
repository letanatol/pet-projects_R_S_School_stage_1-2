import { createHTMLElement } from '@components/createHTMLElement';
import { CarType } from '@helpers/types';
import { carSvg } from './carSvg';

const LENGTH = 0;

export function createTrack(car: CarType): HTMLElement {
  const { name, color, id } = car;
  const track = createHTMLElement({ tagName: 'div', classNames: ['track'] });
  track.dataset.track = id.toString();

  const buttons = createHTMLElement({ tagName: 'div', classNames: ['track-buttons'] });
  const trackCar = createHTMLElement({ tagName: 'div', classNames: ['track-car'] });

  const buttonSelect = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-select'],
    textContent: 'Select',
  });
  const buttonRemove = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-remove'],
    textContent: 'Remove',
  });
  const buttonStart = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-start'],
    textContent: 'Start',
  });
  const buttonStop = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-stop'],
    textContent: 'Stop',
  });

  const carName = createHTMLElement({ tagName: 'div', classNames: ['car-name'] });
  carName.innerHTML = name;

  const carImage = createHTMLElement({ tagName: 'div', classNames: ['car-image'] });
  carImage.innerHTML = carSvg;

  const svgs = carImage.querySelectorAll('svg');
  if (svgs.length > LENGTH) {
    svgs.forEach((svg) => {
      const currentSvg = svg;
      currentSvg.style.fill = color;
    });
  }

  carImage.dataset.car = id.toString();

  buttons.append(buttonSelect, buttonRemove, buttonStart, buttonStop);
  trackCar.append(carName, carImage);
  track.append(buttons, trackCar);

  return track;
}
