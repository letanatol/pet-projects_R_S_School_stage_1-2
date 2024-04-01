import { createHTMLElement } from '@components/createHTMLElement';
import './controls.scss';
import { EventTypes } from '@helpers/types';
import { state } from '@helpers/State';

export function createControls(): HTMLElement {
  const container = createHTMLElement({ tagName: 'div', classNames: ['container-controls'] });
  // CREATE
  const controlsCreate = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-create'] });
  const inputCreateText = createHTMLElement({ tagName: 'input', classNames: ['input', 'input-text'] });
  // при 'onChange' state.setUpdate
  // inputCreateText.addEventListener('change', () => {
  // state.updateCreateCar(inputCreateText.value as string);
  // });
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

  controlsCreate.append(inputCreateText, inputCreateColor, buttonCreate);
  // UPDATE
  const controlsUpdate = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-update'] });
  const inputUpdateText = createHTMLElement<'input'>({ tagName: 'input', classNames: ['input', 'input-text__update'] });
  inputUpdateText.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    state.updateInputName(target.value);
  });

  const inputUpdateColor = createHTMLElement<'input'>({
    tagName: 'input',
    classNames: ['input', 'input-color__update'],
  });
  if (inputUpdateColor instanceof HTMLInputElement) {
    inputUpdateColor.setAttribute('type', 'color');
    inputUpdateColor.value = '#000000';
  }
  inputUpdateColor.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    state.updateInputColor(target.value);
  });

  const buttonUpdate = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button-update'],
    textContent: 'Update',
  });
  buttonUpdate.disabled = true;
  controlsUpdate.append(inputUpdateText, inputUpdateColor, buttonUpdate);

  // controlsButtons
  const controlsButtons = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-buttons'] });
  const buttonRace = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-race'],
    textContent: 'Race',
  });
  const buttonReset = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button-reset'],
    textContent: 'Reset',
  });
  buttonReset.disabled = true;

  const buttonGenerate = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-generate'],
    textContent: 'Generate cars',
  });
  controlsButtons.append(buttonRace, buttonReset, buttonGenerate);
  container.append(controlsCreate, controlsUpdate, controlsButtons);

  window.addEventListener(EventTypes.UpdateUI, () => {
    const stateUi = state.getUiState();
    if (stateUi.updateHidden) {
      buttonUpdate.disabled = true;
    } else {
      buttonUpdate.disabled = false;
    }
  });

  return container;
}
