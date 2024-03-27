import { EventTypes, StateType, UiState } from './types';

class State {
  private state: StateType = {
    ui: {
      garageHidden: false,
      winnersHidden: true,
    },
  };

  public updateUi = (newState: UiState): void => {
    this.state.ui = { ...this.state.ui, ...newState };
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUI, { bubbles: true, detail: {} }));
  };

  public getUiState = (): UiState => this.state.ui;
}

const state = new State();

export { state };
