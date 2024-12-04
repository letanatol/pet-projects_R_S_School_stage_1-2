import { UserType } from '@helpers/types';
import { localStorageService } from './helpers/localStorage';
import { LoginPage } from './pages/loginPage/loginPage';
import { StartPage } from './pages/startPage/startPage';

export class App {
  private mainContainer: HTMLElement;

  constructor() {
    this.mainContainer = document.createElement('main');
    this.mainContainer.classList.add('container');
    document.body.prepend(this.mainContainer);
  }

  public customEvents(): void {
    window.addEventListener('logout', () => {
      localStorageService.clearData();

      const loginPage = new LoginPage(this.mainContainer);
      const loginPageContainer = loginPage.drawLoginContainer();
      this.mainContainer.innerHTML = '';
      this.mainContainer.append(loginPageContainer);
    });
  }

  public drawMainContainer(): void {
    const savedUser = localStorageService.getData<UserType>('user');

    if (savedUser) {
      const startPage = new StartPage(this.mainContainer);
      const startPageContainer = startPage.drawStartContainer();
      this.mainContainer.append(startPageContainer);
    } else {
      const loginPage = new LoginPage(this.mainContainer);
      const loginPageContainer = loginPage.drawLoginContainer();
      this.mainContainer.append(loginPageContainer);
    }
  }
}
