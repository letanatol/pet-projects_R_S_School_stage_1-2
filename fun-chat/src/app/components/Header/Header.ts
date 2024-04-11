import './header.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';

export class Header extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('section');
    this.container.classList.add('header');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = `
      <div class="header__user-name"> User: 
        <span id="userName">Tanya</span>
      </div>
      <h1>Fun Chat</h1>
      <button class="button header__button-info" id="info">Info</button>
      <button class="button header__button-logout" id="logout">Logout</>
    `;

    return this.container;
  }

  protected addEventListeners(): void {}
}
