import { state } from '@helpers/State';
import { MainContainer } from '@components/MainContainer/MainContainer';
import { Header } from '@components/header/header';

export class App {
  constructor() {
    const { body } = document;
    const header = new Header(state);
    const mainContainer = new MainContainer(state);

    body.append(header.init(), mainContainer.init());
  }
}
