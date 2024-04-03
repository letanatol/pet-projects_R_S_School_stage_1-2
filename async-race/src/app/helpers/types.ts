export type StateType = {
  api: {
    garage: LoadState | null;
    winners: LoadState | null;
  };
  controls: ControlsType;
  selectedCar: CarType;
  inputsCreate: InputsType;
  inputsUpdate: InputsType;
  car: CarType;
  garage: GarageState;
  winners: WinnersState;
  page: string;
};

export type InputsType = {
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
  prevHidden: boolean;
  nextHidden: boolean;
};

export type UiState = {
  createHidden?: boolean;
  updateHidden?: boolean;
  generateHidden?: boolean;
  raceHidden?: boolean;
  prevHidden?: boolean;
  nextHidden?: boolean;
};

export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type EngineData = {
  velocity: number;
  distance: number;
};

export type GarageState = {
  countCars: number;
  currentCars: CarType[];
  carsEngine: Record<number, EngineData>;
  countPages: number;
  numberPage: number;
};

export type WinnerType = {
  name: string;
  color: string;
  id: number;
  wins?: number;
  time?: number;
};

export type WinnersState = {
  currentWinner: WinnerType | null;
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
  UpdateSelectedCar = 'UpdateSelectedCar',
  UpdateCountPages = 'UpdateCountPages',
  UpdateCountWinners = 'UpdateCountWinners',
  StartRace = 'StartRace',
}
