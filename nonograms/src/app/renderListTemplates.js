export const listTemplatesSection = document.createElement('section');

export function renderSelectTemplates(arrayTemplates) {
  while (listTemplatesSection.firstChild) {
    listTemplatesSection.removeChild(listTemplatesSection.firstChild);
  }

  listTemplatesSection.classList.add('section', 'list-templates');
  const labelTemplates = document.createElement('label');
  labelTemplates.classList.add('label-templates');
  labelTemplates.setAttribute('for', 'templates');
  labelTemplates.innerText = 'Select picture:';

  listTemplatesSection.append(labelTemplates);

  const templateNames = Object.keys(arrayTemplates);
  const selectTemplates = document.createElement('select');
  selectTemplates.id = 'templates';

  templateNames.forEach((templateName) => {
    const option = document.createElement('option');
    option.value = templateName;
    option.innerText = `${templateName.slice(0, 1).toUpperCase()}${templateName.slice(1)}`;
    option.selected = templateName === 'tree' || templateName === 'tree2' || templateName === 'tree3';
    selectTemplates.append(option);
  });
  listTemplatesSection.append(selectTemplates);
}
