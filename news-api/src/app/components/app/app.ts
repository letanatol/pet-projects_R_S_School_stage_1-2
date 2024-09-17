import { Data } from 'src/app/helper/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElement } from 'src/app/helper/utils';

class App {
  private controller = new AppController();
  private view = new AppView();

  public start() {
    this.controller.getSources((data?: Data) => this.view.drawSources(data));

    const sourcesElement = getElement<HTMLButtonElement>(document.body, '.sources');

    sourcesElement
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
  }
}

export default App;
