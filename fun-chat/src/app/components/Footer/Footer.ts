import './footer.scss';
import BaseComponent from '@components/BaseComponent/BaseComponent';

export class Footer extends BaseComponent {
  constructor() {
    super();
    this.container = document.createElement('section');
    this.container.classList.add('footer');
  }

  protected container: HTMLElement;

  protected draw(): HTMLElement {
    this.container.innerHTML = `
      <div class="footer__row">
        <ul class="footer__list">
          <li class="footer__item">
            <a href="https://github.com/letanatol/" target="_blank" class="footer__link">letanatol</a>
          </li>
          <li class="footer__item">
            <strong class="contacts__bold">2024</strong>
          </li>
          <li class="footer__item">
            <a href="https://rs.school/courses/javascript-mentoring-program" target="_blank" class="footer__link">
             RS School
            </a>
          </li>
        </ul>
      </div>
    `;
    return this.container;
  }

  protected addEventListeners(): void {}
}
