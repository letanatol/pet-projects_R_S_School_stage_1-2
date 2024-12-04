import { getElementByData } from './utils';
import './helpers.scss';

const START_INDEX = 0;
const STEP = 1;

export function isArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = START_INDEX; i < arr1.length; i += STEP) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export function validateArrays(arr1: string[], arr2: string[]): void {
  for (let i = START_INDEX; i < arr1.length; i += STEP) {
    if (arr1[i] !== arr2[i]) {
      const wrapperWord = getElementByData<HTMLElement>(document.body, 'word', arr1[i]);
      wrapperWord.classList.add('red-border');
    }
  }
}
