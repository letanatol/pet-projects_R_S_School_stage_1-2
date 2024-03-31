import BaseComponent from '@components/BaseComponent/BaseComponent';
import './garage.scss';
import { createControls } from '@components/controls/controls';
import { createHTMLElement } from '@components/createHTMLElement';
import { createInfoCountCars, createInfoNumberPage } from '@components/pageInfo/pageInfoGarage';
import { State } from '@helpers/State';
import { createCar, getCars } from 'src/app/api/garageApi';
import { createTrack } from '@components/track/createTrack';
import { EventTypes } from '@helpers/types';
import { getElementById } from '@helpers/utils';

export class Garage extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = createHTMLElement({ tagName: 'div', classNames: ['container-garage'] });
    this.tracksContainer = createHTMLElement({ tagName: 'div', classNames: ['container-tracks'] });
    this.state = state;
    this.testGetCars();
  }

  protected container: HTMLElement;

  protected tracksContainer: HTMLElement;

  private state: State;

  protected draw(): HTMLElement {
    const controlsContainer = createControls();

    const countCars = this.state.getCountCars();
    const infoCountCars = createInfoCountCars(countCars);

    const numberPage = this.state.getNumberPageGarage();
    const infoNumberPage = createInfoNumberPage(numberPage);

    this.tracksContainer.innerHTML = '';
    this.state.getCurrentCars().forEach((car) => {
      const track = createTrack(car);
      this.tracksContainer.append(track);
    });

    this.container.append(controlsContainer, infoCountCars, infoNumberPage, this.tracksContainer);

    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdateCurrentCars, () => {
      this.tracksContainer.innerHTML = '';
      this.state.getCurrentCars().forEach((car) => {
        const track = createTrack(car);
        this.tracksContainer.append(track);
      });
    });

    window.addEventListener(EventTypes.UpdateCountCars, () => {
      const countCars = this.state.getCountCars();
      const infoCountCars = getElementById('count-cars');
      infoCountCars.innerHTML = '';
      infoCountCars.innerHTML = `(${countCars.toString()})`;
    });

    window.addEventListener(EventTypes.UpdateNumberPageGarage, () => {
      const numberPage = this.state.getNumberPageGarage();
      const infoNumberPage = getElementById('number-page_garage');
      infoNumberPage.innerHTML = '';
      infoNumberPage.innerHTML = `(${numberPage.toString()})`;
    });

    this.container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (!target || !target.classList) return;

      if (target.classList.contains('button-create')) {
        const inputText = document.querySelector('.input-text') as HTMLInputElement;
        const inputColor = document.querySelector('.input-color') as HTMLInputElement;

        const textValue = inputText.value;
        const colorValue = inputColor.value;
        if (textValue !== '') {
          createCar({ color: colorValue, name: textValue })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          this.testGetCars();
        }
        inputText.value = '';
        inputColor.value = '#000000';
        // this.state.addNewCar();
      }
    });
  }

  private testGetCars(): void {
    getCars({ _limit: 12 })
      .then((response) => {
        this.state.updateCurrentCars(response.data);
        this.state.updateCountCars(Number(response.headers?.get('X-Total-Count')));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
