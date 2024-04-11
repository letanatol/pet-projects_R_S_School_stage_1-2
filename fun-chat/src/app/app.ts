import { MainContainer } from '@components/MainContainer/MainContainer';
import { state } from '@helpers/State/State';

export class App {
  constructor() {
    const { body } = document;
    const mainContainer = new MainContainer();
    body.addEventListener('click', () => {
      state.getState();
    });

    body.append(mainContainer.init());
  }
}
