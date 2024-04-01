import BaseComponent from '@components/BaseComponent/BaseComponent';
import './garage.scss';
import { createControls } from '@components/controls/controls';
import { createHTMLElement } from '@components/createHTMLElement';
import { createInfoCountCars, createInfoNumberPage } from '@components/pageInfo/pageInfoGarage';
import { State } from '@helpers/State';
import { createCar, deleteCar, getCars, updateCar } from 'src/app/api/garageApi';
import { createTrack } from '@components/track/createTrack';
import { EventTypes, LoadState } from '@helpers/types';
import { getElementById } from '@helpers/utils';
import { createFooter } from '@components/Footer/Footer';
import { getRandomCar, getRandomColor } from '@helpers/randomCar';

const STEP = 1;
const STEP_BACK = -1;
const START = 0;
const MAX_RENDER_CARS = 100;

export class Garage extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = createHTMLElement({ tagName: 'div', classNames: ['container-garage'] });
    this.tracksContainer = createHTMLElement({ tagName: 'div', classNames: ['container-tracks'] });
    this.state = state;
    // this.testGetCars();
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

    const footer = createFooter();

    this.container.append(controlsContainer, infoCountCars, infoNumberPage, this.tracksContainer, footer);

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

    window.addEventListener(EventTypes.NeedGarageUpdate, () => {
      getCars({ _page: this.state.getNumberPageGarage(), _limit: 7 })
        .then((response) => {
          this.state.updateCurrentCarsOnPage(response.data);
          this.state.updateCountCars(Number(response.headers?.get('X-Total-Count')));
          this.state.updateGarageApiState(LoadState.LOADED);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    this.container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      this.state.getState();

      if (!target || !target.classList) return;

      if (target.classList.contains('button-create')) {
        const inputText = document.querySelector('.input-text') as HTMLInputElement;
        const inputColor = document.querySelector('.input-color') as HTMLInputElement;
        // state.getValue
        const textValue = inputText.value;
        const colorValue = inputColor.value;
        if (textValue !== '') {
          createCar({ color: colorValue, name: textValue })
            .then((response) => {
              this.state.updateGarageApiState(LoadState.NEED_REFRESH);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          // this.testGetCars();
        }
        inputText.value = '';
        inputColor.value = '#000000';
        // this.state.addNewCar();
      }

      if (target.classList.contains('button-update')) {
        const inputUpdateText = document.querySelector('.input-text__update') as HTMLInputElement;
        const inputUpdateColor = document.querySelector('.input-color__update') as HTMLInputElement;
        const updateName = this.state.getInputName();
        if (updateName !== '') {
          const updateColor = this.state.getInputColor();
          const idSelectedCar = this.state.getIdSelectedCar();
          if (idSelectedCar) {
            console.log('Я здесь:', updateName, updateColor, idSelectedCar);
            updateCar(idSelectedCar, { name: updateName, color: updateColor })
              .then((response) => {
                this.state.updateGarageApiState(LoadState.NEED_REFRESH);
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          this.state.updateIdSelectedCar(null);
          this.state.updateInputName('');
          this.state.updateInputColor('#000000');
          inputUpdateText.value = this.state.getInputName();
          inputUpdateColor.value = this.state.getInputColor();
          this.state.updateUi({ updateHidden: true });
        }
      }

      if (target.classList.contains('button-prev')) {
        this.state.updateNumberPageGarage(STEP_BACK);
      }

      if (target.classList.contains('button-next')) {
        this.state.updateNumberPageGarage(STEP);
      }

      if (target.classList.contains('button-select')) {
        this.state.updateUi({ updateHidden: false });
        const trackElement = target.closest('.track') as HTMLElement;

        if (trackElement && trackElement.dataset.track) {
          const trackValue = Number(trackElement.dataset.track);
          this.state.updateIdSelectedCar(trackValue);
        }
      }

      if (target.classList.contains('button-generate')) {
        for (let i = START; i < MAX_RENDER_CARS; i += STEP) {
          const { brand, model } = getRandomCar();
          const randomName = `${brand} ${model}`;
          const randomColor = getRandomColor();
          createCar({ color: randomColor, name: randomName })
            .then((response) => {
              this.state.updateGarageApiState(LoadState.NEED_REFRESH);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      if (target.classList.contains('button-remove')) {
        const trackElement = target.closest('.track') as HTMLElement;

        if (trackElement && trackElement.dataset.track) {
          const trackValue = Number(trackElement.dataset.track);
          deleteCar(trackValue)
            .then((response) => {
              this.state.updateGarageApiState(LoadState.NEED_REFRESH);
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  }
}
