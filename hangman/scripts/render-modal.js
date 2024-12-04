function renderModal() {
  const gameModal = document.createElement('div');
  gameModal.classList = 'game-modal';

  const gameModalContent = document.createElement('div');
  gameModalContent.classList = 'content';

  const modalImage = document.createElement('img');
  modalImage.src = './/../assets/modal-won.png';
  modalImage.alt = 'image-won';
  modalImage.classList = 'game-modal__image';

  const gameModalTitle = document.createElement('h4');
  gameModalTitle.classList = 'game-modal__title';

  const gameModalText = document.createElement('p');
  gameModalText.classList = 'game-modal__text';

  const gameModalButton = document.createElement('button');
  gameModalButton.classList = 'play-again';
  gameModalButton.id = 'playAgain';
  gameModalButton.innerText = 'Play again';


  document.body.prepend(gameModal);
  gameModal.append(gameModalContent);
  gameModalContent.append(modalImage);
  gameModalContent.append(gameModalTitle);
  gameModalContent.append(gameModalText);
  gameModalContent.append(gameModalButton);
}

renderModal();