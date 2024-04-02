import { createHTMLElement } from '@components/createHTMLElement';
import './controls.scss';
import { EventTypes } from '@helpers/types';
import { state } from '@helpers/State';

export function createControls(): HTMLElement {
  const container = createHTMLElement({ tagName: 'div', classNames: ['container-controls'] });
  // CREATE
  const controlsCreate = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-create'] });

  const inputCreateName = createHTMLElement<'input'>({ tagName: 'input', classNames: ['input', 'input-text'] });
  const inputCreateNameFromState = state.getInputCreateName();
  inputCreateName.value = inputCreateNameFromState;
  inputCreateName.addEventListener('input', (event) => {
    const { value } = event.target as HTMLInputElement;
    state.updateInputCreateName(value);
  });

  const inputCreateColor = createHTMLElement<'input'>({ tagName: 'input', classNames: ['input', 'input-color'] });
  inputCreateColor.setAttribute('type', 'color');
  const inputCreateColorFromState = state.getInputCreateColor();
  inputCreateColor.value = inputCreateColorFromState;
  inputCreateColor.addEventListener('input', (event) => {
    const { value } = event.target as HTMLInputElement;
    state.updateInputCreateColor(value);
  });

  const buttonCreate = createHTMLElement({
    tagName: 'button',
    classNames: ['button', 'button-create'],
    textContent: 'Create',
  });
  controlsCreate.append(inputCreateName, inputCreateColor, buttonCreate);

  // UPDATE
  const controlsUpdate = createHTMLElement({ tagName: 'div', classNames: ['controls-row', 'controls-update'] });
  const inputUpdateName = createHTMLElement<'input'>({ tagName: 'input', classNames: ['input', 'input-text__update'] });

  const inputUpdateNameFromState = state.getInputUpdateName();
  inputUpdateName.value = inputUpdateNameFromState;
  inputUpdateName.addEventListener('input', (event) => {
    const { value } = event.target as HTMLInputElement;
    state.updateInputUpdateName(value);
  });

  const inputUpdateColor = createHTMLElement<'input'>({
    tagName: 'input',
    classNames: ['input', 'input-color__update'],
  });
  inputUpdateColor.setAttribute('type', 'color');

  const inputUpdateColorFromState = state.getInputUpdateColor();
  inputUpdateColor.value = inputUpdateColorFromState;
  inputUpdateColor.addEventListener('input', (event) => {
    const { value } = event.target as HTMLInputElement;
    state.updateInputUpdateColor(value);
  });

  const buttonUpdate = createHTMLElement<'button'>({
    tagName: 'button',
    classNames: ['button', 'button-update'],
    textContent: 'Update',
  });

  const stateUiDuringRender = state.getUiState();
  if (stateUiDuringRender.updateHidden) {
    buttonUpdate.disabled = true;
    inputUpdateName.disabled = true;
    inputUpdateColor.disabled = true;
  } else {
    buttonUpdate.disabled = false;
    inputUpdateName.disabled = false;
    inputUpdateColor.disabled = false;
  }
  controlsUpdate.append(inputUpdateName, inputUpdateColor, buttonUpdate);

  // RACE RESET GENERATE
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
      inputUpdateName.disabled = true;
      inputUpdateColor.disabled = true;
    } else {
      buttonUpdate.disabled = false;
      inputUpdateName.disabled = false;
      inputUpdateColor.disabled = false;
    }
  });

  return container;
}
