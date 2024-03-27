import { ModelsCarType } from './types';
import dataCars from '../data/data.json';

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
