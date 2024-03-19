import { state } from './State/State';

const COUNT_ROWS = 9;
const NUMBER_OF_SYMBOLS = 2;
const FIRST_ROW = 0;
const STEP = 1;

export function nextRowRoundLevel(): void {
  if (state.getRowCurrent() === COUNT_ROWS) {
    state.setRowCurrent(FIRST_ROW);

    if (Number(state.getRoundCurrent()) === Number(state.getRoundsCount())) {
      state.setRoundCurrent('01');

      if (Number(state.getLevelCurrent()) === Number(state.getLevelsCount())) {
        state.setLevelCurrent('1');
      } else {
        state.setLevelCurrent((Number(state.getLevelCurrent()) + STEP).toString());
      }
    } else {
      state.setRoundCurrent((Number(state.getRoundCurrent()) + STEP).toString().padStart(NUMBER_OF_SYMBOLS, '0'));
    }
  } else {
    state.setRowCurrent(state.getRowCurrent() + STEP);
  }
}
