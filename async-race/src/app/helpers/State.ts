import { CarType, EventTypes, StateType, UiState } from './types';

class State {
  private state: StateType = {
    ui: {
      garageHidden: false,
      winnersHidden: true,
    },
    car: {
      name: '',
      color: '',
      id: 0,
    },
    garage: {
      countCars: 0,
      currentCars: [],
      countPages: 1,
      numberPage: 1,
    },
    winners: {
      countWinners: 0,
      countPages: 1,
      currentPage: 1,
    },
    page: 'garage',
  };

  public updateUi = (newState: UiState): void => {
    this.state.ui = { ...this.state.ui, ...newState };
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUI, { bubbles: true, detail: {} }));
  };

  public updatePage = (page: string): void => {
    this.state.page = page;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdatePage, { bubbles: true, detail: {} }));
  };

  public updateCurrentCars = (data: CarType[]): void => {
    this.state.garage.currentCars = data;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateCurrentCars, { bubbles: true, detail: {} }));
  };

  public updateCountCars = (count: number): void => {
    this.state.garage.countCars = count;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateCountCars, { bubbles: true, detail: {} }));
  };

  public updateNumberPageGarage = (count: number): void => {
    this.state.garage.numberPage = count;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateNumberPageGarage, { bubbles: true, detail: {} }));
  };

  public getCurrentCars = (): CarType[] => this.state.garage.currentCars;

  public getPage = (): string => this.state.page;

  public getUiState = (): UiState => this.state.ui;

  public getCountCars = (): number => this.state.garage.countCars;

  public getCountPagesGarage = (): number => this.state.garage.countPages;

  public getNumberPageGarage = (): number => this.state.garage.numberPage;

  public getCountWinners = (): number => this.state.winners.countWinners;

  public getCountPagesWinners = (): number => this.state.winners.countPages;

  public getCurrentPageWinners = (): number => this.state.winners.currentPage;
}

const state = new State();

export { state, State };
