function renderManePage() {
  const container = document.createElement('main');
  container.className = 'container';

  const imageBox = document.createElement('section');
  imageBox.className = 'image-box';

  const imageBoxImg = document.createElement('img');
  imageBoxImg.className = 'image-box__image';
  imageBoxImg.src = './assets/0.svg';
  imageBoxImg.alt = 'hangman-img';

  const imageBoxTitle = document.createElement('h1');
  imageBoxTitle.innerText = "Hangman Game";
  imageBoxTitle.className = 'image-box__title';

  const gameBox = document.createElement('section');
  gameBox.className = 'game-box';

  const gameBoxLetters = document.createElement('ul');
  gameBoxLetters.classList = 'game-box__letters';

  const gameBoxHint = document.createElement('h4');
  gameBoxHint.className = 'game-box__hint';
  gameBoxHint.innerText = "Hint: ";

  const gameBoxHintText = document.createElement('b');
  gameBoxHintText.classList = 'game-box__hint-text';

  const gameBoxGuesses = document.createElement('h4');
  gameBoxGuesses.className = 'game-box__guesses';
  gameBoxGuesses.innerText = "Incorrect guesses: ";

  const gameBoxGuessesText = document.createElement('b');
  gameBoxGuessesText.classList = 'game-box__guesses-text';
  gameBoxGuessesText.innerText = '0 / 6';

  const gameBoxKeyboard = document.createElement('div');
  gameBoxKeyboard.classList = 'game-box__keyboard';

  const step = 1;
  const charCodeA = 97;
  const charCodeZ = 122;

  for (let i = charCodeA; i <= charCodeZ; i += step) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    button.dataset.about = true;
    gameBoxKeyboard.appendChild(button);
  }

  function renderContainer() {
    container.append(imageBox);
    container.append(gameBox);
    document.body.prepend(container);
  }

  function renderImageBox() {
    imageBox.append(imageBoxImg);
    imageBox.append(imageBoxTitle);
  }

  function renderGameBox() {
    gameBox.append(gameBoxLetters);
    gameBox.append(gameBoxHint);
    gameBoxHint.append(gameBoxHintText);
    gameBox.append(gameBoxGuesses);
    gameBoxGuesses.append(gameBoxGuessesText);
    gameBox.append(gameBoxKeyboard);
  }
 
  renderContainer();
  renderImageBox();
  renderGameBox();
}

renderManePage();
