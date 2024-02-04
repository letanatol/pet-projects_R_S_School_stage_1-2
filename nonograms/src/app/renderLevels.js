const levelsSection = document.createElement('section');

function renderLevelsSection(levelsObject) {
  levelsSection.classList.add('section', 'levels');

  const levelsWrapper = document.createElement('div');
  levelsWrapper.classList.add('levels__wrapper');

  for (const key in levelsObject) {
    if (levelsObject.hasOwnProperty(key)) {
      const levelValue = levelsObject[key];

      const input = document.createElement('input');
      input.classList.add('levels__input');
      input.type = 'radio';
      input.name = 'levels';
      input.id = key;
      input.value = key;
      input.checked = key === 'easy';

      const label = document.createElement('label');
      label.classList.add('levels__label', `levels__label-${key}`);
      label.setAttribute('for', key);

      const circle = document.createElement('div');
      circle.classList.add('circle', `circle-${key}`);

      const labelText = document.createElement('span');
      labelText.classList.add(`label-text-${key}`);
      labelText.innerHTML = levelValue;

      levelsSection.append(levelsWrapper);
      label.appendChild(circle);
      label.appendChild(labelText);
      levelsWrapper.appendChild(input);
      levelsWrapper.appendChild(label);
    }
  }
  // return levelsSection;
}

export { levelsSection, renderLevelsSection };
