import questionAnswer from "./question-answer.js";

let currentAnswer;

const getRandomQuestionAnswer = () => {
  const { answer, hint } = questionAnswer[Math.floor(Math.random() * questionAnswer.length)];

  console.log(answer);
  currentAnswer = answer.toUpperCase();
  document.querySelector('.game-box__hint-text').innerText = hint;

}

getRandomQuestionAnswer();