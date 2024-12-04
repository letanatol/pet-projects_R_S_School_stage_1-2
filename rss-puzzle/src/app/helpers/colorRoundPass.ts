import { localStorageService } from './localStorage';
import { getElementById } from './utils';

import './helpers.scss';

export function colorRoundPass(): void {
  const roundsPass = localStorageService.getData<string[]>('roundsPass'); // ['1_02', '1_03']
  const selectedLevel = getElementById<HTMLSelectElement>('levels').value;
  roundsPass?.forEach((item) => {
    const idLevel = `${item.split('_')[0]}`;
    if (selectedLevel === idLevel) {
      const idRound = `${item.split('_')[1]}`;
      getElementById<HTMLElement>(`rounds_${idRound}`).classList.add('color-green');
    }
  });
}
