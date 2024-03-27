import { createHTMLElement } from '@components/createHTMLElement';

export class Garage {
  private garageContainer: HTMLElement = createHTMLElement({ tagName: 'div', classNames: ['container-garage'] });

  public toggleHiddenClass(): void {
    if (this.garageContainer) {
      this.garageContainer.classList.toggle('hidden');
    }
  }

  public getGarageContainer(): HTMLElement {
    return this.garageContainer;
  }
}
