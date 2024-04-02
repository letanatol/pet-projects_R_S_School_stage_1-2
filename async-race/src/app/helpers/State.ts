import { CarType, EngineData, EventTypes, LoadState, StateType, UiState, WinnerType } from './types';

class State {
  private state: StateType = {
    api: {
      garage: null,
      winners: null,
    },
    controls: {
      createHidden: false,
      updateHidden: true,
      generateHidden: false,
      prevHidden: true,
      nextHidden: true,
    },
    inputsCreate: {
      inputName: '',
      inputColor: '',
    },
    inputsUpdate: {
      inputName: '',
      inputColor: '',
    },
    selectedCar: {
      id: 0,
      name: '',
      color: '',
    },
    car: {
      name: '',
      color: '',
      id: 0,
    },
    garage: {
      countCars: 0,
      currentCars: [],
      carsEngine: [],
      countPages: 1,
      numberPage: 1,
    },
    winners: {
      winnersArray: [
        {
          name: 'Tesla',
          color: '#ff0000',
          id: 1,
          wins: 1,
          time: 10,
        },
        {
          name: 'BMW',
          color: '#00ff00',
          id: 2,
          wins: 2,
          time: 5.36,
        },
        {
          name: 'Tesla',
          color: '#0000ff',
          id: 3,
          wins: 1,
          time: 2.65,
        },
        {
          name: 'BMW',
          color: '#ff0000',
          id: 4,
          wins: 3,
          time: 8.25,
        },
      ],
      countWinners: 4,
      countPages: 1,
      currentPage: 1,
    },
    page: 'garage',
  };

  public updateSelectedCar = (car: CarType): void => {
    this.state.selectedCar = car;

    window.dispatchEvent(new CustomEvent(EventTypes.UpdateSelectedCar, { bubbles: true, detail: { car } }));
  };

  public updateInputCreateName = (name: string): void => {
    this.state.inputsCreate.inputName = name;
  };

  public updateInputCreateColor = (color: string): void => {
    this.state.inputsCreate.inputColor = color;
  };

  public updateInputUpdateName = (name: string): void => {
    this.state.inputsUpdate.inputName = name;
  };

  public updateInputUpdateColor = (color: string): void => {
    this.state.inputsUpdate.inputColor = color;
  };

  public updateGarageApiState = (newState: LoadState): void => {
    this.state.api.garage = newState;
    switch (newState) {
      case LoadState.LOADED:
        window.dispatchEvent(new CustomEvent(EventTypes.GarageUpdated, { bubbles: true, detail: {} }));
        break;
      case LoadState.NEED_REFRESH:
        window.dispatchEvent(new CustomEvent(EventTypes.NeedGarageUpdate, { bubbles: true, detail: {} }));
        break;
      default:
        break;
    }
  };

  public updateUi = (newState: UiState): void => {
    this.state.controls = { ...this.state.controls, ...newState };
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUI, { bubbles: true, detail: {} }));
  };

  public updatePage = (page: string): void => {
    this.state.page = page;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdatePage, { bubbles: true, detail: {} }));
  };

  public updateCurrentCarsOnPage = (data: CarType[]): void => {
    this.state.garage.currentCars = data;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateCurrentCars, { bubbles: true, detail: {} }));
  };

  public updateCurrentCarEngine = (id: number, data: EngineData): void => {
    this.state.garage.carsEngine[id] = data;

    console.log(this.state.garage.carsEngine);
  };

  public updateCountCars = (count: number): void => {
    this.state.garage.countCars = count;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateCountCars, { bubbles: true, detail: {} }));
  };

  public updateNumberPageGarage = (change: number): void => {
    this.state.garage.numberPage += change;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateNumberPageGarage, { bubbles: true, detail: {} }));
    this.updateGarageApiState(LoadState.NEED_REFRESH);
  };

  public updateCountPages = (value: number): void => {
    this.state.garage.countPages = value;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateCountPages, { bubbles: true, detail: {} }));
  };

  public updateWinners = (winner: WinnerType): void => {
    this.state.winners.winnersArray.push(winner);
    this.state.winners.countWinners = this.state.winners.winnersArray.length;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateCountWinners, { bubbles: true, detail: {} }));
  };

  public getWinners = (): WinnerType[] => this.state.winners.winnersArray;

  public getCurrentCars = (): CarType[] => this.state.garage.currentCars;

  public getPage = (): string => this.state.page;

  public getUiState = (): UiState => this.state.controls;

  public getCountCars = (): number => this.state.garage.countCars;

  public getCountPagesGarage = (): number => this.state.garage.countPages;

  public getNumberPageGarage = (): number => this.state.garage.numberPage;

  public getCountWinners = (): number => this.state.winners.countWinners;

  public getCountPagesWinners = (): number => this.state.winners.countPages;

  public getCurrentPageWinners = (): number => this.state.winners.currentPage;

  public getInputCreateName = (): string => this.state.inputsCreate.inputName;

  public getInputCreateColor = (): string => this.state.inputsCreate.inputColor;

  public getInputUpdateName = (): string => this.state.inputsUpdate.inputName;

  public getInputUpdateColor = (): string => this.state.inputsUpdate.inputColor;

  public getSelectedCar = (): CarType => this.state.selectedCar;

  public getState = (): void => {
    console.log(this.state);
  };
}

const state = new State();

export { state, State };
