export type StateType = {
  api: {
    garage: LoadState | null;
    winners: LoadState | null;
  };
  controls: ControlsType;
  idSelectedCar: number | null;
  inputsUpdate: InputsUpdate;
  car: CarType;
  garage: GarageState;
  winners: WinnersState;
  page: string;
};

export type InputsUpdate = {
  inputName: string;
  inputColor: string;
};

export enum LoadState {
  LOADED = 'LOADED',
  NEED_REFRESH = 'NEED_REFRESH',
}

export type ControlsType = {
  createHidden: boolean;
  updateHidden: boolean;
  generateHidden: boolean;
};

export type UiState = {
  createHidden?: boolean;
  updateHidden?: boolean;
  generateHidden?: boolean;
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

export type WinnerType = {
  name: string;
  color: string;
  id: number;
  wins: number;
  time: number;
};

export type WinnersState = {
  winnersArray: WinnerType[];
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
  GarageUpdated = 'GarageUpdated',
  NeedGarageUpdate = 'NeedGarageUpdate',
  UpdateIdSelectedCar = 'UpdateIdSelectedCar',
  UpdateCountPages = 'UpdateCountPages',
  UpdateCountWinners = 'UpdateCountWinners',
}
