import { ButtonComponent } from '@components/buttonComponent';

export class LoginPage {
  private usernameInput: HTMLInputElement = document.createElement('input');

  private surnameInput: HTMLInputElement = document.createElement('input');

  public drawLoginContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('container');

    const title = document.createElement('h1');
    title.textContent = 'English Puzzle';
    title.classList.add('title_login');
    container.append(title);

    const form = document.createElement('form');
    form.classList.add('form_login');

    const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.appendChild(document.createTextNode('Name:'));
    this.usernameInput.setAttribute('type', 'text');
    this.usernameInput.setAttribute('id', 'username');
    this.usernameInput.setAttribute('placeholder', 'Enter your name');
    this.usernameInput.setAttribute('required', '');
    this.usernameInput.setAttribute(
      'title',
      'Enter at least 3 Latin characters including an uppercase letter. Only "-" special characters are allowed.'
    );
    this.usernameInput.addEventListener('input', () => this.usernameInput.classList.remove('error'));
    this.usernameInput.addEventListener('input', () => {
      const isValid = /^[A-Z][a-zA-Z-]{2,}$/.test(this.usernameInput.value);
      if (isValid) {
        this.usernameInput.classList.remove('error');
      } else {
        this.usernameInput.classList.add('error');
      }
    });

    const surnameLabel = document.createElement('label');
    surnameLabel.setAttribute('for', 'surname');
    surnameLabel.appendChild(document.createTextNode('Surname:'));
    this.surnameInput.setAttribute('type', 'text');
    this.surnameInput.setAttribute('id', 'surname');
    this.surnameInput.setAttribute('placeholder', 'Enter your surname');
    this.surnameInput.setAttribute('required', '');
    this.surnameInput.setAttribute(
      'title',
      'Enter at least 4 Latin characters including an uppercase letter. Only "-" special characters are allowed.'
    );
    this.surnameInput.addEventListener('input', () => this.surnameInput.classList.remove('error'));
    this.surnameInput.addEventListener('input', () => {
      const isValid = /^[A-Z][a-zA-Z-]{3,}$/.test(this.surnameInput.value);
      if (isValid) {
        this.surnameInput.classList.remove('error');
      } else {
        this.surnameInput.classList.add('error');
      }
    });

    const usernameWrapper = document.createElement('div');
    usernameWrapper.classList.add('input_wrapper');
    usernameWrapper.append(usernameLabel);
    usernameWrapper.append(this.usernameInput);
    const surnameWrapper = document.createElement('div');
    surnameWrapper.classList.add('input_wrapper');
    surnameWrapper.append(surnameLabel);
    surnameWrapper.append(this.surnameInput);

    const submitButton = new ButtonComponent('Login').createButton();
    submitButton.setAttribute('type', 'submit');

    form.append(usernameWrapper, surnameWrapper, submitButton);
    form.addEventListener('submit', (event) => this.handleLogin(event));

    container.appendChild(form);

    return container;
  }

  private handleLogin(event: Event): void {
    event.preventDefault();
    const isValidUsername = /^[A-Z][a-zA-Z-]{2,}$/.test(this.usernameInput.value);
    if (!isValidUsername) {
      this.usernameInput.classList.add('error');

      return;
    }

    const isValidSurname = /^[A-Z][a-zA-Z-]{3,}$/.test(this.surnameInput.value);
    if (!isValidSurname) {
      this.surnameInput.classList.add('error');
    }
  }
}
