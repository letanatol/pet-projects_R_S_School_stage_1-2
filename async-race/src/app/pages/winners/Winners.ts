import BaseComponent from '@components/BaseComponent/BaseComponent';
import { createHTMLElement } from '@components/createHTMLElement';
import { createPageInfoWinners } from '@components/pageInfo/pageInfoWinners';
import { State } from '@helpers/State';
import './winners.scss';
import { createWinner } from '@components/tableWinners/winner';
import { EventTypes, LoadState } from '@helpers/types';
import { getWinners } from 'src/app/api/winnerApi';

const STEP = 1;

export class Winners extends BaseComponent {
  constructor(state: State) {
    super();
    this.container = createHTMLElement({ tagName: 'div', classNames: ['container-winners'] });
    this.tableBody = createHTMLElement({ tagName: 'div', classNames: ['table-body'] });
    this.state = state;
  }

  protected container: HTMLElement;

  protected tableBody: HTMLElement;

  protected state: State;

  public draw(): HTMLElement {
    // const countWinners = this.state.getCountWinners();
    const pageInfoContainer = createPageInfoWinners();
    const tableContainer = createHTMLElement({ tagName: 'div', classNames: ['container-table'] });
    const tableHeader = createHTMLElement({ tagName: 'div', classNames: ['table-header'] });
    const headerNumber = createHTMLElement({
      tagName: 'div',
      classNames: ['th', 'th-number'],
      textContent: 'Number',
    });
    const headerCar = createHTMLElement({
      tagName: 'div',
      classNames: ['th', 'th-car'],
      textContent: 'Car',
    });
    const headerName = createHTMLElement({
      tagName: 'div',
      classNames: ['th', 'th-name'],
      textContent: 'Name',
    });
    const headerWins = createHTMLElement({
      tagName: 'div',
      classNames: ['th', 'th-wins'],
      textContent: 'Wins',
    });
    const headerTime = createHTMLElement({
      tagName: 'div',
      classNames: ['th', 'th-time'],
      textContent: 'Besttime',
    });

    tableHeader.append(headerNumber, headerCar, headerName, headerWins, headerTime);
    this.tableBody = createHTMLElement({ tagName: 'div', classNames: ['table-body'] });

    const currentWinners = this.state.getWinners();
    currentWinners.forEach((item, index) => {
      const winner = createWinner(item, index + STEP);
      this.tableBody.append(winner);
    });

    tableContainer.append(tableHeader, this.tableBody);

    // const footer = createFooter();
    this.container.append(pageInfoContainer, tableContainer);

    return this.container;
  }

  protected addEventListeners(): void {
    // window.addEventListener(EventTypes.UpdateCountWinners, () => {
    //   const countWinners = this.state.getCountWinners();
    //   const infoCountWinners = getElementById('count-winners');
    //   infoCountWinners.innerHTML = '';
    //   infoCountWinners.innerHTML = `(${countWinners.toString()})`;
    // });

    window.addEventListener(EventTypes.UpdateCountWinners, () => {
      this.tableBody.innerHTML = '';
      const currentWinners = this.state.getWinners();
      currentWinners.forEach((item, index) => {
        const winner = createWinner(item, index + STEP);
        this.tableBody.append(winner);
      });
    });

    window.addEventListener(EventTypes.NeedWinnersUpdate, () => {
      getWinners({ _page: this.state.getNumberPageGarage(), _limit: 10 })
        .then((response) => {
          this.state.updateWinners(response.data);
          // this.state.updateCountCars(Number(response.headers?.get('X-Total-Count')));
          this.state.updateWinnersApiState(LoadState.LOADED);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
}
