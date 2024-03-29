import { EventTypes, UiState } from './types';

class State {
  private state = {
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
      countCars: 4,
      countPages: 1,
      currentPage: 1,
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

  public getPage = (): string => this.state.page;

  public getUiState = (): UiState => this.state.ui;

  public getCountCars = (): number => this.state.garage.countCars;

  public getCountPagesGarage = (): number => this.state.garage.countPages;

  public getCurrentPageGarage = (): number => this.state.garage.currentPage;

  public getCountWinners = (): number => this.state.winners.countWinners;

  public getCountPagesWinners = (): number => this.state.winners.countPages;

  public getCurrentPageWinners = (): number => this.state.winners.currentPage;
}

const state = new State();

export { state, State };
