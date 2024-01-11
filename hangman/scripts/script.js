import questionAnswer from "./question-answer.js";

const hangmanImage = document.querySelector('.image-box__image');
const gameBoxLetters = document.querySelector('.game-box__letters');
const guessesCounter = document.querySelector('.game-box__guesses-text');
const keyboard = document.querySelector('.game-box__keyboard');

const maxGuesses = 6;
let currentAnswer;
let badAnswers;
let goodAnswers;


const getRandomQuestionAnswer = () => {
  const { answer, hint } = questionAnswer[Math.floor(Math.random() * questionAnswer.length)];

  console.log(answer);
  currentAnswer = answer.toUpperCase();
  document.querySelector('.game-box__hint-text').innerText = hint;

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
