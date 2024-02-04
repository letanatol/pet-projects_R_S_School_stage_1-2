import { renderSelectTemplates } from "../renderListTemplates.js";
import { templatesObject } from "../templates.js";
import { renderGameBox } from "../render-gameBox.js";
import { initUserAnswer } from "./userAnswers.js";
import { setSelectedTemplate } from "./selectTemplate.js";
import { resetStopwatch } from "../stopWatch.js";

let selectedLevel = Object.keys(templatesObject)[0];

export const setSelectedLevel = (value) => {
  selectedLevel = value;
};

export const getSelectedLevel = () => selectedLevel;

export const addLevelSelectListeners = () => { 
  const levelInputs = document.querySelectorAll('.levels__input');

  levelInputs.forEach(input => {
    input.addEventListener('click', () => {
      const selectedTemplate = templatesObject[input.value];
      
      setSelectedLevel(input.value);

      resetStopwatch();

      if (selectedTemplate) {
        setSelectedTemplate(Object.keys(templatesObject[input.value])[0]);

        renderSelectTemplates(selectedTemplate);
        renderGameBox(Object.values(selectedTemplate)[0]);
        initUserAnswer();
      }
    });
  });
}
