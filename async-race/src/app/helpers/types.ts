export type StateType = {
  ui: UiState;
};

export type UiState = {
  garageHidden?: boolean;
  winnersHidden?: boolean;
};

export type ModelsCarType = {
  brand: string;
  models: string[];
};

export type HTMLElementType = {
  tagName: keyof HTMLElementTagNameMap;
  classNames?: string[];
  textContent?: string;
};

export enum EventTypes {
  UpdateUI = 'UpdateUI',
}
