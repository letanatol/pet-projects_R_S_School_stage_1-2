import { createHTMLElement } from '@components/createHTMLElement';
import './controls.scss';

export function createControls(): HTMLElement {
  const container = createHTMLElement({ tagName: 'div', classNames: ['container-controls'] });
  // CREATE
  const controlsCreate = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-create'] });
  const inputCreateText = createHTMLElement({ tagName: 'input', classNames: ['input', 'input-text'] });
  const inputCreateColor = createHTMLElement({ tagName: 'input', classNames: ['input', 'input-color'] });
  if (inputCreateColor instanceof HTMLInputElement) {
    inputCreateColor.setAttribute('type', 'color');
    inputCreateColor.value = '#000000';
  }
  const buttonCreate = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-create'],
    textContent: 'Create',
  });

  buttonCreate.addEventListener('click', () => {
    console.log('Button CREATE');
  });
  controlsCreate.append(inputCreateText, inputCreateColor, buttonCreate);
  // UPDATE
  const controlsUpdate = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-update'] });
  const inputUpdateText = createHTMLElement({ tagName: 'input', classNames: ['input', 'input-text'] });
  const inputUpdateColor = createHTMLElement({ tagName: 'input', classNames: ['input', 'input-color'] });
  if (inputUpdateColor instanceof HTMLInputElement) {
    inputUpdateColor.setAttribute('type', 'color');
    inputUpdateColor.value = '#000000';
  }
  const buttonUpdate = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-create'],
    textContent: 'Update',
  });

  buttonUpdate.addEventListener('click', () => {
    console.log('Button UPDATE');
  });
  controlsUpdate.append(inputUpdateText, inputUpdateColor, buttonUpdate);
  // controlsButtons
  const controlsButtons = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-buttons'] });
  const buttonRace = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-race'],
    textContent: 'Race',
  });
  const buttonReset = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-reset'],
    textContent: 'Reset',
  });
  const buttonGenerate = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-generate'],
    textContent: 'Generate cars',
  });
  controlsButtons.append(buttonRace, buttonReset, buttonGenerate);
  container.append(controlsCreate, controlsUpdate, controlsButtons);
  return container;
}
