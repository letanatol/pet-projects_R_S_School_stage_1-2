import { createHTMLElement } from '@components/createHTMLElement';

export class Winners {
  private winnersContainer: HTMLElement = createHTMLElement({ tagName: 'div', classNames: ['container-winners'] });

  public toggleHiddenClass(): void {
    if (this.winnersContainer) {
      this.winnersContainer.classList.toggle('hidden');
    }
  }

  public getWinnersContainer(): HTMLElement {
    return this.winnersContainer;
  }
}
