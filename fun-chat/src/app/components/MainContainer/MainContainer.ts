import './mainContainer.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { sessionStorageService } from '@helpers/sessionStorage';
import { EventTypes, UserType } from '@helpers/types';
import { ChatPage } from 'src/app/pages/chatPage/ChatPage';
import { LoginPage } from 'src/app/pages/loginPage/LoginPage';

export class MainContainer extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('main');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = '';
    const user = this.getUserFromStorage();
    if (user && user.password) {
      const containerChatPage = new ChatPage().init();
      this.container.append(containerChatPage);
    } else {
      const containerLoginPage = new LoginPage().init();
      this.container.append(containerLoginPage);
    }

    return this.container;
  }

  private getUserFromStorage(): UserType | null {
    const user = sessionStorageService.getData<UserType>('user');

    if (user) {
      return user;
    }

    return null;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdatePage, () => {
      this.draw();
    });
  }
}
