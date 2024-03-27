import { EventTypes, StateType, UiState } from './types';

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
      countCars: 4,
      countPages: 1,
      currentPage: 1,
    },
  };

  public updateUi = (newState: UiState): void => {
    this.state.ui = { ...this.state.ui, ...newState };
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUI, { bubbles: true, detail: {} }));
  };

  public getUiState = (): UiState => this.state.ui;

  public getCountCars = (): number => this.state.garage.countCars;

  public getCountPages = (): number => this.state.garage.countPages;

  public getCurrentPage = (): number => this.state.garage.currentPage;
}

const state = new State();

export { state };
