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

    const surnameLabel = document.createElement('label');
    surnameLabel.setAttribute('for', 'surname');
    surnameLabel.appendChild(document.createTextNode('Surname:'));
    this.surnameInput.setAttribute('type', 'text');
    this.surnameInput.setAttribute('id', 'surname');
    this.surnameInput.setAttribute('placeholder', 'Enter your surname');
    this.surnameInput.setAttribute('required', '');

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

    container.appendChild(form);

    return container;
  }
}
