import { OptionComponent } from '@components/optionComponent';
import { state } from '@helpers/State/State';
import { colorRoundPass } from '@helpers/colorRoundPass';

class RoundSelector {
  public getRounds(): HTMLElement {
    const roundsCount = state.getRoundsCount();
    const roundSelect = new OptionComponent('round', roundsCount, 'rounds');
    const roundDiv = roundSelect.createOption();
    roundDiv.id = 'rounds';
    roundDiv.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const selectedOption = target.options[target.selectedIndex];

      if (selectedOption) {
        state.setRoundCurrent(selectedOption.value);
      }
    });

    roundDiv.addEventListener('click', () => {
      colorRoundPass();
    });
    return roundDiv;
  }
}

export { RoundSelector };
