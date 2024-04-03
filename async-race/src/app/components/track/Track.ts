import { createHTMLElement } from '@components/createHTMLElement';
import { CarType, EventTypes, LoadState } from '@helpers/types';
import { deleteWinner } from 'src/app/api/winnerApi';
import { carSvg } from './carSvg';
import { deleteCar } from '../../api/garageApi';
import { state } from '../../helpers/State';
import { setEngineStatus } from '../../api/engineApi';

const LENGTH = 0;
const START = 0;
const PROGRESS_INDEX = 1;
const CLIENT_WIDTH = 150;

export class Track {
  private track = createHTMLElement({ tagName: 'div', classNames: ['track'] });

  private animationId: number = START;

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
    this.buttonStart.addEventListener('click', () => this.startDrive());
    this.buttonStop.addEventListener('click', () => this.stopEngine());

    window.addEventListener(EventTypes.StartRace, () => this.startDrive());
    window.addEventListener(EventTypes.StopRace, () => this.stopEngine());
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

    deleteWinner(this.car.id)
      .then(() => {
        state.updateWinnersApiState(LoadState.NEED_REFRESH);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private step = (timestamp: number): void => {
    if (!this.start) {
      this.start = timestamp;
    }
    const { distance, velocity } = state.getCarsEngine(this.car.id);
    const lengthTrack = document.documentElement.clientWidth - CLIENT_WIDTH;
    const duration = distance / velocity;
    const progress = (timestamp - this.start) / duration;

    const translate = progress * lengthTrack;

    this.carImage.style.transform = `translateX(${translate}px)`;
    if (progress < PROGRESS_INDEX) {
      this.animationId = window.requestAnimationFrame(this.step);
    }
  };

  // private startEngine(): void {
  //   setEngineStatus({
  //     id: this.car.id,
  //     status: 'started',
  //   })
  //     .then((response) => {
  //       console.log(response);

  //       state.updateCurrentCarEngine(this.car.id, response.data);

  //       // TODO Disable start button, enable stop button
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  private startDrive(): void {
    setEngineStatus({
      id: this.car.id,
      status: 'started',
    })
      .then((response) => {
        state.updateCurrentCarEngine(this.car.id, response.data);

        this.animationId = window.requestAnimationFrame(this.step);

        setEngineStatus({
          id: this.car.id,
          status: 'drive',
        })
          .then(() => {
            state.updateCurrentWinner(this.car);
          })
          .catch(() => {
            // console.log('Car was broken ', this.car.name);
            window.cancelAnimationFrame(this.animationId);
          });
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
        this.carImage.style.transform = 'translateX(0px)';

        if (this.animationId > START) {
          window.cancelAnimationFrame(this.animationId);
        }

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
  }
}
