export class ButtonComponent {
  constructor(
    private text: string,
    private onClick?: () => void
  ) {}

  public createButton(): HTMLButtonElement {
    const buttonNode = document.createElement('button');
    buttonNode.innerHTML = this.text;
    buttonNode.classList.add('button');
    if (this.onClick) {
      const onClickHandler = this.onClick;
      buttonNode.addEventListener('click', () => onClickHandler());
    }

    return buttonNode;
  }
}
