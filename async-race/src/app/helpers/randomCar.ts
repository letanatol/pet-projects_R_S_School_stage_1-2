import { ModelsCarType } from './types';
import dataCars from '../data/data.json';

const MAX_COLOR_VALUE = 255;
const STEP = 1;
const decimalBase = 16;
const hexStringLength = 2;
const hexStringPad = '0';

function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function getRandomCar(): { brand: string; model: string } {
  const randomCar = getRandomItem<ModelsCarType>(dataCars);
  const randomBrand = randomCar.brand;
  const randomModel = getRandomItem(randomCar.models);
  return { brand: randomBrand, model: randomModel };
}

export function getRandomColor(): string {
  const red = Math.floor(Math.random() * (MAX_COLOR_VALUE + STEP));
  const green = Math.floor(Math.random() * (MAX_COLOR_VALUE + STEP));
  const blue = Math.floor(Math.random() * (MAX_COLOR_VALUE + STEP));

  const hexColor = `#${red.toString(decimalBase).padStart(hexStringLength, hexStringPad)}${green.toString(decimalBase).padStart(hexStringLength, hexStringPad)}${blue.toString(decimalBase).padStart(hexStringLength, hexStringPad)}`;

  return hexColor;
}
