import { setSoundDisable, setSoundEnable } from "./startGame/paintCell";

export const buttonSoundSection = document.createElement('section');

const addToggleSoundListener = (div) => {
  div.addEventListener('click', function () {
    if (div.classList.contains('sound-off')) {
      setSoundEnable();
    } else {
      setSoundDisable();
    }

    div.classList.toggle('sound-off');
  });
};

export function renderButtonSoundSection() {
  buttonSoundSection.classList.add('buttons');

  const buttonSound = document.createElement('button');
  buttonSound.classList.add('button', 'buttons__sound');
  addToggleSoundListener(buttonSound);

  buttonSoundSection.append(buttonSound);
}
