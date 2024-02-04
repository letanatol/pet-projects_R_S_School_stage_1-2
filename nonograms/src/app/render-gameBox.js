import { getCurrentTimer, initTimer, resetStopwatch } from "./stopWatch.js";
import { setLocalStorage, getLocalStorage } from "./startGame/localStorage.js";
import { paintCell } from "./startGame/paintCell.js";

export const gameBoxSection = document.createElement('section');

let step = 1;
const PAINT_CELL = 1;

function generateHints(puzzle) {
  const arrayRowHints = [];
  const arrayColHints = [];
  let hintFieldLength = puzzle.length;
  let hintFieldWidth = puzzle[0].length;

  for (let i = 0; i < hintFieldLength; i += step) {
    const trackHint = [];
    let countPaintCells = 0;

    for (let k = 0; k < hintFieldWidth; k += step) {
      const currentCell = puzzle[i][k];

      if (currentCell === PAINT_CELL) {
        countPaintCells += step;
      }
      if (currentCell !== PAINT_CELL && countPaintCells > 0) {
        trackHint.push(countPaintCells);
        countPaintCells = 0;
      }
    }

    if (countPaintCells > 0) {
      trackHint.push(countPaintCells);
    }

    arrayColHints.push(trackHint);
  }

  for (let k = 0; k < puzzle[0].length; k += step) {
    const trackHint = [];
    let countPaintCells = 0;

    for (let i = 0; i < puzzle.length; i += step) {
      const currentCell = puzzle[i][k];

      if (currentCell === PAINT_CELL) {
        countPaintCells += step;
      }
      if (currentCell !== PAINT_CELL && countPaintCells > 0) {
        trackHint.push(countPaintCells);
        countPaintCells = 0;
      }
    }
    if (countPaintCells > 0) {
      trackHint.push(countPaintCells);
    }

    arrayRowHints.push(trackHint);
  }

  return { rowHints: arrayRowHints, colHints: arrayColHints };
}

function renderHintsRow(puzzle) {
  const gameBoxHintsRow = document.createElement('div');
  gameBoxHintsRow.className = 'game-box__hint-row';
  gameBoxHintsRow.id = 'hint-row';

  const objectHints = generateHints(puzzle);
  const arraysHints = objectHints.rowHints;

  for (let i = 0; i < arraysHints.length; i += step) {
    const hintCellWrapColumn = document.createElement('div');
    hintCellWrapColumn.className = 'hint-cell__wrap-column';
    gameBoxHintsRow.style.gridTemplateColumns = `repeat(${puzzle.length}, 20px)`;
    gameBoxHintsRow.appendChild(hintCellWrapColumn);

    for (let k = 0; k < arraysHints[i].length; k += step) {
      const currentCell = arraysHints[i][k];
      const hintCell = document.createElement('div');
      hintCell.className = ('hint-cell');
      hintCell.textContent = `${currentCell}`;
      hintCell.dataset.row = i;
      hintCell.dataset.col = k;
      hintCellWrapColumn.appendChild(hintCell);
    }
  }

  return gameBoxHintsRow;
}

function renderHintsColumn(arrayTemplate) {
  const gameBoxHintColumn = document.createElement('div');
  gameBoxHintColumn.className = 'game-box__hint-column';
  gameBoxHintColumn.id = 'hint-column';

  const objectHints = generateHints(arrayTemplate);
  const arraysHints = objectHints.colHints;

  for (let i = 0; i < arraysHints.length; i += step) {
    const hintCellWrapColumn = document.createElement('div');
    hintCellWrapColumn.className = 'hint-cell__wrap-row';
    gameBoxHintColumn.appendChild(hintCellWrapColumn);

    for (let k = 0; k < arraysHints[i].length; k += step) {
      const currentCell = arraysHints[i][k];
      const hintCell = document.createElement('div');
      hintCell.className = ('hint-cell');
      hintCell.textContent = `${currentCell}`;
      hintCell.dataset.row = i;
      hintCell.dataset.col = k;
      hintCellWrapColumn.appendChild(hintCell);
    }
  }

  return gameBoxHintColumn;
}

export function renderGameBoxField(puzzle) {
  const gameBoxField = document.createElement('div');
  gameBoxField.className = ('game-box__field');
  gameBoxField.style.gridTemplate = `repeat(${puzzle.length}, 20px)/repeat(${puzzle.length}, 20px)`;

  let gameFieldLength = puzzle.length;
  let gameFieldWidth = puzzle[0].length;
  for (let i = 0; i < gameFieldLength; i += step) {
    for (let k = 0; k < gameFieldWidth; k += step) {

      const span = document.createElement('span');
      span.className = 'grid__item';
      span.dataset.row = i;
      span.dataset.col = k;
      span.addEventListener('click', () => {

        // console.log(`Clicked on row ${i}, column ${k}`);
      });

      gameBoxField.appendChild(span);
    }
  }

  gameBoxField.addEventListener('click', () => {
    const minutesDiv = document.querySelector('.time-minutes');
    const secondsDiv = document.querySelector('.time-seconds');
    
    if (getCurrentTimer() === null) {
      initTimer(minutesDiv, secondsDiv);
    }
  });

  paintCell(gameBoxField);

  return gameBoxField;
}

export function renderGameBox(puzzle) {
  while (gameBoxSection.firstChild) {
    gameBoxSection.removeChild(gameBoxSection.firstChild);
  }

  gameBoxSection.classList.add('section', 'game-box');

  const gameBoxRow1 = document.createElement('div');
  gameBoxRow1.className = ('game-box__row-1');
  const gameBoxHintRow = renderHintsRow(puzzle);

  const gameBoxRow2 = document.createElement('div');
  gameBoxRow2.className = ('game-box__row-2');
  const gameBoxHintColumn = renderHintsColumn(puzzle);

  const gameBoxField = renderGameBoxField(puzzle);
  gameBoxSection.append(gameBoxRow1);
  gameBoxSection.append(gameBoxRow2);
  gameBoxRow1.append(gameBoxHintRow);
  gameBoxRow2.append(gameBoxHintColumn);
  gameBoxRow2.append(gameBoxField);

  setLocalStorage('currentPuzzle', puzzle);
}
