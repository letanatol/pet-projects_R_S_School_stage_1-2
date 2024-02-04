export const buttonThemeSection = document.createElement('section');

const addToggleThemeListener = (div) => {
  const { body } = document;

  div.addEventListener('click', function () {
    body.classList.toggle('theme-dark');
  });
};

export function renderButtonThemeSection() {
  buttonThemeSection.classList.add('buttons');

  const buttonTheme = document.createElement('button');
  buttonTheme.classList.add('button', 'button-theme');
  buttonTheme.innerText = 'Toggle Theme';
  addToggleThemeListener(buttonTheme);

  buttonThemeSection.append(buttonTheme);
}
