import { MainContainer } from '@components/MainContainer/MainContainer';
import { Modal } from '@components/modalCloseServer/modalCloseServer';
import { state } from '@helpers/State/State';

export class App {
  constructor() {
    const { body } = document;
    const mainContainer = new MainContainer();
    const modalContainer = new Modal();
    body.addEventListener('click', () => {
      state.getState();
    });

    body.append(mainContainer.init(), modalContainer.init());
  }
}
