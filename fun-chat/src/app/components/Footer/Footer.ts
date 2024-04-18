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
            <a href="https://github.com/letanatol/" target="_blank" class="footer__link">
              <img src="../../../assets/images/content/github_svg.svg" alt="Logo GitHub" width="30" height="30">letanatol
            </a>
          </li>
          <li class="footer__item">
            <strong class="contacts__bold">2024</strong>
          </li>
          <li class="footer__item">
            <a href="https://rs.school/courses/javascript-mentoring-program" target="_blank" class="footer__link">
              <img src="../../../assets/images/content/RS_School-svg.svg" alt="Logo RS School" width="60" height="40">
            </a>
          </li>
        </ul>
      </div>
    `;
    return this.container;
  }

  protected addEventListeners(): void {}
}
