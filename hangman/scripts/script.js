import questionAnswer from "./question-answer.js";

const hangmanImage = document.querySelector('.image-box__image');
const gameBoxLetters = document.querySelector('.game-box__letters');
const guessesCounter = document.querySelector('.game-box__guesses-text');
const keyboard = document.querySelector('.game-box__keyboard');
const gameModal = document.querySelector('.game-modal');
const playAgain = document.querySelector('.play-again');

const maxGuesses = 6;
let currentAnswer;
let badAnswers;
let goodAnswers;

const resetGame = () => {
  goodAnswers = [];
  badAnswers = 0;

  hangmanImage.src = `./assets/${badAnswers}.svg`;
  guessesCounter.innerText = `${badAnswers} / ${maxGuesses}`;
  keyboard.querySelectorAll('button').forEach((button) => {
    button.disabled = false;
    button.dataset.about = true;
  });

  gameBoxLetters.innerHTML = [...currentAnswer].map(() =>
    `<li class="letter"></li>`).join(''); // __ __ __ __ __ __ нарисует нижний бортик по длине слова
  gameModal.classList.remove('show');
}

const getRandomQuestionAnswer = () => {
  const { answer, hint } = questionAnswer[Math.floor(Math.random() * questionAnswer.length)];

  console.log(answer);
  currentAnswer = answer.toUpperCase();
  document.querySelector('.game-box__hint-text').innerText = hint;

  resetGame();
}

const gameOver = (isWon) => {
  setTimeout(() => {
    const modalText = isWon ? `You found the word:` : `The correct word was: `;

    gameModal.querySelector('img').src = `./assets/${isWon ? 'modal-won' : 'modal-lost'}.png`;
    gameModal.querySelector('h4').innerText = `${isWon ? 'Congrats!' : 'Game Over!'}`;
    gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentAnswer}</b>`;
    gameModal.classList.add("show");
  }, 300);
}

const initGame = (button, letter) => {
  if (currentAnswer.toUpperCase().includes(letter)) {
    [...currentAnswer].forEach((item, index) => {
      if (item === letter) {
        goodAnswers.push(item);
        gameBoxLetters.querySelectorAll('li')[index].innerText = item;
        gameBoxLetters.querySelectorAll('li')[index].classList.add("guessed");
      }
    })
  } else {
    badAnswers++;
    hangmanImage.src = `./assets/${badAnswers}.svg`;
  }
  button.disabled = true;
  button.dataset.about = false;
  guessesCounter.innerText = `${badAnswers} / ${maxGuesses}`;

  if (badAnswers === maxGuesses) {
    return gameOver(false);
  }
  if (goodAnswers.length === currentAnswer.length) {
    return gameOver(true);
  }
}

getRandomQuestionAnswer();

keyboard.querySelectorAll('button').forEach((button) => {
  button.addEventListener("click", event => initGame(event.target, button.innerText));
});

document.addEventListener('keydown', event => {
  keyboard.querySelectorAll('button').forEach((button) => {
    if (button.innerText === event.key.toLocaleUpperCase() && button.dataset.about === 'true') {
      initGame(button, event.key.toUpperCase());
    }
  })
});

playAgain.addEventListener('click', getRandomQuestionAnswer);