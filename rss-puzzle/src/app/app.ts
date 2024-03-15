import { LoginPage } from './pages/loginPage/loginPage';

export class App {
  private mainContainer: HTMLElement;

  constructor() {
    this.mainContainer = document.createElement('main');
    this.mainContainer.classList.add('container');
    document.body.prepend(this.mainContainer);
  }

  public drawMainContainer(): void {
    if (this.mainContainer) {
      const loginPage = new LoginPage();
      const loginPageContainer = loginPage.drawLoginContainer();
      this.mainContainer.append(loginPageContainer);
    }
  }
}
