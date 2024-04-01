import { ModelsCarType } from './types';
import dataCars from '../data/data.json';

const MAX_COLOR_VALUE = 255;
const STEP = 1;

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
  // Генерируем случайные значения для каждого канала цвета (красный, зеленый, синий)
  const red = Math.floor(Math.random() * (MAX_COLOR_VALUE + STEP)); // От 0 до 255
  const green = Math.floor(Math.random() * (MAX_COLOR_VALUE + STEP)); // От 0 до 255
  const blue = Math.floor(Math.random() * (MAX_COLOR_VALUE + STEP)); // От 0 до 255

  // Формируем строку в формате RGB
  const colorString = `rgb(${red}, ${green}, ${blue})`;

  return colorString;
}
