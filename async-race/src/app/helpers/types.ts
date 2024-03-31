export type StateType = {
  ui: UiState;
  car: CarType;
  garage: GarageState;
  winners: WinnersState;
  page: string;
};

export type UiState = {
  garageHidden?: boolean;
  winnersHidden?: boolean;
};

export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type GarageState = {
  countCars: number;
  currentCars: CarType[];
  countPages: number;
  numberPage: number;
};

export type WinnersState = {
  countWinners: number;
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
  UpdatePage = 'UpdatePage',
  UpdateCurrentCars = 'UpdateCurrentCars',
  UpdateCountCars = 'UpdateCountCars',
  UpdateNumberPageGarage = 'UpdateNumberPageGarage',
}
