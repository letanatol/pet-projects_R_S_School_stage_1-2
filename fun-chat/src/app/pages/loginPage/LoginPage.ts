import { getElementById } from '@helpers/utils';
import './loginPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { state } from '@helpers/State/State';
import { EventTypes } from '@helpers/types';
import { socket } from 'src/app/api/socket';
// import { sessionStorageService } from '../../helpers/sessionStorage';

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
          <label>Name</label>
          <div class="input-wrapper_login-page">
            <input id="input-name" placeholder="Enter the name" type="text" class="input_login-page" autocomplete="username">
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
      const inputName = getElementById<HTMLInputElement>('input-name');
      const name = inputName.value;
      const inputPassword = getElementById<HTMLInputElement>('input-password');
      const password = inputPassword.value;

      state.upDateUser(name, password);

      inputName.value = '';
      inputPassword.value = '';
    });

    window.addEventListener(EventTypes.UpdateUser, () => {
      const user = state.getUser();
      socket.send(JSON.stringify(user));
    });
  }
}
