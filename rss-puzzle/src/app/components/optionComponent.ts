const STEP = 1;
const NUMBER_OF_SYMBOLS = 2;
const ROUND_VALUE = 9;

export class OptionComponent {
  private select: HTMLSelectElement = document.createElement('select');

  constructor(
    private text: string,
    private roundsCount: string
  ) {}

  public createOption(): HTMLElement {
    const optionNode = document.createElement('div');
    const label = document.createElement('label');
    label.classList.add('level_label');
    label.setAttribute('for', `${this.text}`);
    label.innerText = `${this.text}:`;

    this.select.id = 'level';
    const numbersOptions = Array.from({ length: Number(this.roundsCount) }, (_, index) => (index + STEP).toString());
    numbersOptions.forEach((level) => {
      const option = document.createElement('option');
      let doubleNumber = '';
      if (numbersOptions.length > ROUND_VALUE) {
        doubleNumber = level.padStart(NUMBER_OF_SYMBOLS, '0');
      } else {
        doubleNumber = level;
      }
      option.value = doubleNumber;
      option.innerText = doubleNumber;
      option.selected = level === '1';
      this.select.append(option);
    });

    optionNode.append(label);
    optionNode.append(this.select);

    return optionNode;
  }

  public changeSelectedOption = (value: string): void => {
    this.select.value = value;
  };
}
