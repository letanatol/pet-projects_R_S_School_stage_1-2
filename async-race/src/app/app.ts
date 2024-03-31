import { state } from '@helpers/State';
import { Header } from '@components/Header/Header';
import { MainContainer } from '@components/MainContainer/MainContainer';

export class App {
  constructor() {
    const { body } = document;
    const header = new Header(state);
    const mainContainer = new MainContainer(state);

    body.append(header.init(), mainContainer.init());
  }
}
