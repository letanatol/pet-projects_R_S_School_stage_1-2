import { createHeader } from '@components/header/header';
import { Garage } from './pages/garage/Garage';
import { Winners } from './pages/winners/Winners';

export class App {
  constructor() {
    const { body } = document;

    const garageContainer: Garage = new Garage();
    const winnersContainer: Winners = new Winners();
    // const onGarageButtonClick = (): void => garageContainer.toggleHiddenClass();
    // const onWinnersButtonClick = (): void => winnersContainer.toggleHiddenClass();

    const header = createHeader();
    // winnersContainer.toggleHiddenClass();
    body.append(header, garageContainer.drawContainer(), winnersContainer.drawWinnersContainer());
  }
}
