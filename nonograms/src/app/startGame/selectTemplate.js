import { templatesObject } from "../templates.js";
import { renderGameBox } from "../render-gameBox.js";
import { getSelectedLevel } from "./selectLevel.js";
import { resetStopwatch } from "../stopWatch.js";

let selectedTemplate;

export const setSelectedTemplate = (value) => {
  selectedTemplate = value;
}

export const getSelectedTemplate = () => selectedTemplate;

function getSelectedImage() {
  const selectElement = document.getElementById('templates');

  if (selectElement) {
    const selectedValue = selectElement.value;

    return selectedValue;
  }

  return null;
}

export const addSelectTemplateListeners = () => {
  setSelectedTemplate(Object.keys(templatesObject[getSelectedLevel()])[0]);


  const selectElement = document.querySelector('.list-templates');

  if (selectElement) {
    selectElement.addEventListener('change', () => {
      const selectedImage = getSelectedImage();
      const arrayValues = Object.values(templatesObject);

      setSelectedTemplate(selectedImage);

      resetStopwatch();

      arrayValues.forEach((item) => {
        if (item.hasOwnProperty(selectedImage)) {
          renderGameBox(item[selectedImage]);
        }
      })
    }); 
  }
}

export { getSelectedImage };
