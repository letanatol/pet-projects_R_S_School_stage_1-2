import { getElementById } from '@helpers/utils';
import './loginPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { sessionStorageService } from '@helpers/sessionStorage';
import { state } from '@helpers/State/State';
// import { EventTypes } from '@helpers/types';
import { chatApi } from 'src/app/api/socket';

export class LoginPage extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container_login-page');
    this.form = document.createElement('form');
    this.form.classList.add('form_login-page');
    this.container.append(this.form);
  }

  protected container: HTMLElement;

  protected form: HTMLFormElement;

  protected draw(): HTMLElement {
    this.form.innerHTML = `
      <fieldset class="fieldset_login-page">
        <legend>Authorization</legend>
        <div class="row_login-page">
          <label>Login</label>
          <div class="input-wrapper_login-page">
            <input id="input-login" placeholder="Enter the login" type="text" class="input_login-page" autocomplete="inputLogin">
          </div>
        </div>
        <div class="row_login-page">
          <label>Password</label>
          <div class="input-wrapper_login-page">
            <input id="input-password" placeholder="Enter the password" type="password" class="input_login-page" autocomplete="current-password">
          </div>
        </div>
      </fieldset>
      <button type="submit" class="submit_login-page">Log in</button>
      <button type="button" class="info_login-page">Info</button>
`;
    return this.container;
  }

  protected addEventListeners(): void {
    this.form.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const inputLogin = getElementById<HTMLInputElement>('input-login');
      const login = inputLogin.value;
      const inputPassword = getElementById<HTMLInputElement>('input-password');
      const password = inputPassword.value;

      sessionStorageService.saveData('user', { login, password });
      // state.updatePage('chatPage');
      state.updateUser(login, password);
      const user = state.getUser();
      user.type = 'USER_LOGIN';
      chatApi.wsSend(JSON.stringify(user));

      inputLogin.value = '';
      inputPassword.value = '';
    });
  }
}
