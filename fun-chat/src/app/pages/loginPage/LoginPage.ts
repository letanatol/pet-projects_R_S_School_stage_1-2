import { getElementById } from '@helpers/utils';
import './loginPage.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';
import { sessionStorageService } from '@helpers/sessionStorage';
import { state } from '@helpers/State/State';
import { chatApi } from 'src/app/api/socket';

const MIN_LENGTH_LOGIN = 4;
const MIN_LENGTH_PASSWORD = 6;

export class LoginPage extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('div');
    this.container.classList.add('container_login-page');
    this.form = document.createElement('form');
    this.form.classList.add('form_login-page');
    this.inputLogin = document.createElement('input');
    this.inputLogin.id = 'input-login';
    this.inputLogin.placeholder = 'Enter the login';
    this.inputLogin.classList.add('input_login-page');

    this.inputPassword = document.createElement('input');
    this.inputPassword.id = 'input-password';
    this.inputPassword.placeholder = 'Enter the password';
    this.inputPassword.classList.add('input_password-page');
    this.buttonSubmit = document.createElement('button');
    this.buttonSubmit.classList.add('submit_login-page');
    this.buttonSubmit.textContent = 'Log in';
    this.buttonSubmit.setAttribute('disabled', 'disabled');
    this.form.append(this.inputLogin, this.inputPassword, this.buttonSubmit);
    this.container.append(this.form);
    window.location.hash = 'login';
  }

  protected container: HTMLElement;

  protected form: HTMLFormElement;

  protected inputLogin: HTMLInputElement;

  protected buttonSubmit: HTMLButtonElement;

  protected inputPassword: HTMLInputElement;

  protected draw(): HTMLElement {
    const form = document.createElement('form');
    form.classList.add('form_login-page');

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('fieldset_login-page');

    const legend: HTMLLegendElement = document.createElement('legend');
    legend.textContent = 'Authorization';
    const rowLoginPage = document.createElement('div');
    rowLoginPage.classList.add('row_login-page');
    const label = document.createElement('lable');
    label.textContent = 'Login';
    const wrapperInputLogin = document.createElement('div');
    wrapperInputLogin.classList.add('input-wrapper_login-page');
    const errorMessage = document.createElement('div');
    errorMessage.id = 'login-error';
    wrapperInputLogin.append(this.inputLogin, errorMessage);
    rowLoginPage.append(label, wrapperInputLogin);

    const rowLoginPagePass = document.createElement('div');
    rowLoginPagePass.classList.add('row_login-page');
    const labelPass = document.createElement('lable');
    labelPass.textContent = 'Password';
    const wrapperInputPass = document.createElement('div');
    wrapperInputPass.classList.add('input-wrapper_login-page');
    const errorMessagePass = document.createElement('div');
    errorMessagePass.id = 'password-error';
    wrapperInputPass.append(this.inputPassword, errorMessagePass);
    rowLoginPagePass.append(labelPass, wrapperInputPass);

    fieldset.append(legend, rowLoginPage, rowLoginPagePass);

    const buttonAbout = document.createElement('button');
    buttonAbout.classList.add('about_login-page');
    buttonAbout.textContent = 'About';
    this.form.append(fieldset, this.buttonSubmit, buttonAbout);
    this.container.append(this.form);
    return this.container;
  }

  protected addEventListeners(): void {
    let isLoginValid = false;
    let isPasswordValid = false;

    const validateLogin = (): void => {
      const login = this.inputLogin.value;

      let errorMessage = '';

      if (login.length < MIN_LENGTH_LOGIN) {
        errorMessage += 'Login must be at least 4 characters long. ';
      }

      const latinChars = /^[a-zA-Z]+$/;
      if (!latinChars.test(login)) {
        errorMessage += 'Login must contain only Latin characters. ';
      }

      if (errorMessage) {
        getElementById('login-error').textContent = errorMessage.trim();
        isLoginValid = false;
      } else {
        getElementById('login-error').textContent = '';
        isLoginValid = true;
      }
    };

    const validatePassword = (): void => {
      const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
      const password = this.inputPassword.value;

      let errorMessage = '';

      if (!specialChars.test(password)) {
        errorMessage += 'Password must contain at least one special character. ';
      }

      if (password.length < MIN_LENGTH_PASSWORD) {
        errorMessage += 'Password must be at least 6 characters long. ';
      }

      if (errorMessage) {
        getElementById('password-error').textContent = errorMessage.trim();
        isPasswordValid = false;
      } else {
        getElementById('password-error').textContent = '';
        isPasswordValid = true;
      }
    };

    const handleSubmit = (event: Event): void => {
      const login = this.inputLogin.value;
      const password = this.inputPassword.value;
      event.preventDefault();

      validateLogin();
      validatePassword();

      if (isLoginValid && isPasswordValid) {
        sessionStorageService.saveData('user', { login, password });
        // state.updatePage('main');
        state.updateUser(login, password);
        const user = state.getUser();
        user.type = 'USER_LOGIN';
        chatApi.wsSend(JSON.stringify(user));

        this.inputLogin.value = '';
        this.inputPassword.value = '';
        this.buttonSubmit.removeAttribute('disabled');
      }
    };

    const toggleSubmitButton = (): void => {
      if (isLoginValid && isPasswordValid) {
        this.buttonSubmit.removeAttribute('disabled');
      } else {
        this.buttonSubmit.setAttribute('disabled', 'true');
      }
    };

    this.inputLogin.addEventListener('input', () => {
      validateLogin();
      toggleSubmitButton();
    });
    this.inputPassword.addEventListener('input', () => {
      validatePassword();
      toggleSubmitButton();
    });
    this.form.addEventListener('submit', handleSubmit);
    this.form.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.form.dispatchEvent(new Event('submit'));
      }
    });
  }
}
