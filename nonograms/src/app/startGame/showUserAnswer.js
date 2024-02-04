export function showUserAnswer(arrayAnswer) {
  let step = 1;

  const cells = document.querySelectorAll('.grid__item');

  let gameFieldLength = arrayAnswer.length;
  let gameFieldWidth = arrayAnswer[0].length;
  for (let i = 0; i < gameFieldLength; i += step) {
    for (let k = 0; k < gameFieldWidth; k += step) {
      if (arrayAnswer[i][k] === 1) {
        for (let z = 0; z < cells.length; z += step) {
          const cellRow = parseInt(cells[z].dataset.row);
          const cellCol = parseInt(cells[z].dataset.col);

          if (cellRow === i && cellCol === k) {
            cells[z].classList.add('paint');
            cells[z].classList.remove('mark');
          }
        }
      }
      if (arrayAnswer[i][k] === 2) {
        for (let z = 0; z < cells.length; z += step) {
          const cellRow = parseInt(cells[z].dataset.row);
          const cellCol = parseInt(cells[z].dataset.col);

          if (cellRow === i && cellCol === k) {
            cells[z].classList.add('mark');
            cells[z].classList.remove('paint');
          }
        }
      }
      if (arrayAnswer[i][k] === 0) {
        for (let z = 0; z < cells.length; z += step) {
          const cellRow = parseInt(cells[z].dataset.row);
          const cellCol = parseInt(cells[z].dataset.col);

          if (cellRow === i && cellCol === k) {
            cells[z].classList.remove('paint');
            cells[z].classList.remove('mark');
          }
        }
      }
    }
  }
}
