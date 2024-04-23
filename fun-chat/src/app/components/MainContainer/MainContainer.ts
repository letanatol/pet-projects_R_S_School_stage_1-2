import { state } from '@helpers/State/State';
import './mainContainer.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { sessionStorageService } from '@helpers/sessionStorage';
import { EventTypes } from '@helpers/types';
import { ChatPage } from 'src/app/pages/chatPage/ChatPage';
import { LoginPage } from 'src/app/pages/loginPage/LoginPage';
import { chatApi } from 'src/app/api/socket';

export class MainContainer extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('main');
    sessionStorageService.removeData('userForMessages');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = '';
    const user = sessionStorageService.getUserFromStorage('user');
    if (user && user.password) {
      const containerChatPage = new ChatPage().init();
      window.location.hash = 'main';
      this.container.append(containerChatPage);
    } else {
      const containerLoginPage = new LoginPage().init();
      window.location.hash = 'login';
      this.container.append(containerLoginPage);
    }

    return this.container;
  }

  protected drawAbout(): HTMLElement {
    window.location.hash = 'about';
    this.container.innerHTML = '';
    const containerAbout = document.createElement('div');
    containerAbout.classList.add('about__page');
    containerAbout.innerHTML = `
      <h3 class="about__title">Fun Chat</h3>
      <div class="about__info">FunChat is a lively and interactive messaging application designed to bring through engaging conversations</div>
      <a class="about__link" href="https://github.com/letanatol/" target="_blank">letanatol</a>
      <button type="button" class="button__back">Back</button>
    `;

    this.container.append(containerAbout);

    return this.container;
  }

  protected addEventListeners(): void {
    window.addEventListener(EventTypes.UpdatePage, () => {
      const currentPage = state.getPage();
      if (currentPage === 'login') {
        this.draw();
      }

      if (currentPage === 'about') {
        this.drawAbout();
      }

      if (currentPage === 'main') {
        this.draw();
      }
    });

    this.container.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (!target || !target.classList) return;

      if (target.classList.contains('header__button-logout')) {
        const user = state.getUser();
        const userFromStorage = sessionStorageService.getUserFromStorage('user');
        if (userFromStorage && userFromStorage.password) {
          user.type = 'USER_LOGOUT';
          if (user.payload && user.payload.user) {
            user.payload.user.login = userFromStorage.login;
            user.payload.user.password = userFromStorage.password;
            chatApi.wsSend(JSON.stringify(user));
            sessionStorageService.clearData();
            state.updatePage('login');
          }
        }
      }

      if (target.classList.contains('header__button-about')) {
        state.updatePage('about');
        this.drawAbout();
      }

      if (target.classList.contains('about_login-page')) {
        state.updatePage('about');
        this.drawAbout();
      }

      if (target.classList.contains('button__back')) {
        // const currentPage = state.getPage();
        // state.updatePage(currentPage);
        this.draw();
      }
    });

    window.addEventListener('hashchange', () => {
      if (['#login', '#main'].includes(window.location.hash)) {
        const user = sessionStorageService.getUserFromStorage('user');

        if (user && user.password) {
          this.container.innerHTML = '';
          const containerChatPage = new ChatPage().init();
          this.container.append(containerChatPage);
          window.location.hash = 'main';
        } else {
          this.container.innerHTML = '';
          const containerLoginPage = new LoginPage().init();
          this.container.append(containerLoginPage);
          window.location.hash = 'login';
        }
      }
    });
  }
}
