export type StateType = {
  ui: UiState;
  car: CarState;
  garage: GarageState;
};

export type UiState = {
  garageHidden?: boolean;
  winnersHidden?: boolean;
};

export type CarState = {
  name: string;
  color: string;
  id: number;
};

export type GarageState = {
  countCars: number;
  countPages: number;
  currentPage: number;
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
