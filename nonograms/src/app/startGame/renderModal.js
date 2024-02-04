import { resetManePage } from "../render-manePage.js";
import { renderResultSection } from "../renderResultGame.js";
import { addStopAndResetListener } from "./paintCell.js";

export function renderModal() {
  const gameModal = document.createElement('div');
  gameModal.classList = 'game-modal';

  const gameModalContent = document.createElement('div');
  gameModalContent.classList = 'content';

  const gameModalText = document.createElement('p');
  gameModalText.classList = 'game-modal__text';

  const gameModalButton = document.createElement('button');
  gameModalButton.classList = 'play-again';
  gameModalButton.id = 'playAgain';
  gameModalButton.innerText = 'Play again';
  addShowModalListener(gameModalButton);
  addStopAndResetListener(gameModalButton);

  document.body.prepend(gameModal);
  gameModal.append(gameModalContent);
  gameModalContent.append(gameModalText);
  gameModalContent.append(gameModalButton);
}

export const addShowModalListener = (div) => {
  div.addEventListener('click', () => {
    const gameModal = document.querySelector('.game-modal');
    renderResultSection();
    gameModal.classList.remove("show");
    resetManePage();
  });
}