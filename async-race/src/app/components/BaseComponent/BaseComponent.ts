interface IComponent {
  init(): HTMLElement;
}

export default abstract class BaseComponent implements IComponent {
  public init(): HTMLElement {
    const container = this.draw();
    this.addEventListeners();

    return container;
  }

  protected abstract addEventListeners(): void;

  protected abstract draw(): HTMLElement;
}
