import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    this.controller.getSources((data) => this.view.drawSources(data));
    
    document
      .querySelector('.sources')
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
  }
}

export default App;
