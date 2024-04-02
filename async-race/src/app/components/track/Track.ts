import { createHTMLElement } from '@components/createHTMLElement';
import { CarType, LoadState } from '@helpers/types';
import { carSvg } from './carSvg';
import { deleteCar } from '../../api/garageApi';
import { state } from '../../helpers/State';
import { setEngineStatus } from '../../api/engineApi';

const LENGTH = 0;
const START = 0;

export class Track {
  private track = createHTMLElement({ tagName: 'div', classNames: ['track'] });

  private start = START;

  private carImage = createHTMLElement({ tagName: 'div', classNames: ['car-image'] });

  private buttonSelect = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-select'],
    textContent: 'Select',
  });

  private buttonRemove = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-remove'],
    textContent: 'Remove',
  });

  private buttonStart = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-start'],
    textContent: 'Start',
  });

  private buttonStop = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-stop'],
    textContent: 'Stop',
  });

  constructor(private car: CarType) {
    this.track.dataset.track = this.car.id.toString();

    const buttons = createHTMLElement({ tagName: 'div', classNames: ['track-buttons'] });
    const trackCar = createHTMLElement({ tagName: 'div', classNames: ['track-car'] });

    const carName = createHTMLElement({ tagName: 'div', classNames: ['car-name'] });
    carName.innerHTML = this.car.name;

    this.carImage.innerHTML = carSvg;

    const svgs = this.carImage.querySelectorAll('svg');

    if (svgs.length > LENGTH) {
      svgs.forEach((svg) => {
        const currentSvg = svg;
        currentSvg.style.fill = this.car.color;
      });
    }

    this.carImage.dataset.car = this.car.id.toString();

    buttons.append(this.buttonSelect, this.buttonRemove, this.buttonStart, this.buttonStop);
    trackCar.append(carName, this.carImage);
    this.track.append(buttons, trackCar);

    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.buttonSelect.addEventListener('click', () => this.selectCar());
    this.buttonRemove.addEventListener('click', () => this.removeCar());
    this.buttonStart.addEventListener('click', () => this.startEngine());
    this.buttonStop.addEventListener('click', () => this.stopEngine());

    // TODO
    window.addEventListener('startRace', () => this.startEngine());
  }

  public getContainer(): HTMLElement {
    return this.track;
  }

  private removeCar(): void {
    deleteCar(this.car.id)
      .then(() => {
        state.updateGarageApiState(LoadState.NEED_REFRESH);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private step = (timestamp: number): void => {
    if (!this.start) {
      this.start = timestamp;
    }
    const animationDuration = 20000;
    const speedCoefficient = 2;
    const maxOffset = 2000;
    const progress = timestamp - this.start;

    this.carImage.style.transform = `translateX(${Math.min(progress / speedCoefficient, maxOffset)}px)`;
    if (progress < animationDuration) {
      window.requestAnimationFrame(this.step);
    }
  };

  private startEngine(): void {
    setEngineStatus({
      id: this.car.id,
      status: 'started',
    })
      .then((response) => {
        console.log(response);

        state.updateCurrentCarEngine(this.car.id, response.data);

        window.requestAnimationFrame(this.step);

        // TODO Animate car
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private stopEngine(): void {
    setEngineStatus({
      id: this.car.id,
      status: 'stopped',
    })
      .then((response) => {
        console.log(response);

        state.updateCurrentCarEngine(this.car.id, response.data);
        // TODO Stop Animate car
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private selectCar(): void {
    state.updateUi({ updateHidden: false });
    state.updateSelectedCar(this.car);
    console.log(this.car, 'this.car');
  }
}
