let step = 1;
let currentTime = 0;
let timerLink = null;
let stopwatchMinutesDiv;
let stopwatchSecondsDiv;

const drawTime = () => {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;

  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  stopwatchMinutesDiv.innerHTML = formattedMinutes;
  stopwatchSecondsDiv.innerHTML = formattedSeconds;
}

const updateStopwatch = () => {
  currentTime += step;

  drawTime();
};

export function initTimer(minutesDiv, secondsDiv, time = 0) {
  if (timerLink === null) {
    currentTime = time;

    stopwatchMinutesDiv = minutesDiv;
    stopwatchSecondsDiv = secondsDiv;

    drawTime();

    timerLink = setInterval(updateStopwatch, 1000);
  }

  return timerLink;
}

export const getCurrentTimer = () => timerLink;

export function resetStopwatch() {
  console.log('reset stopwatch');

  if (timerLink !== null) {
    clearInterval(timerLink);
    timerLink = null;
    currentTime = 0;

    stopwatchMinutesDiv.innerHTML = '00';
    stopwatchSecondsDiv.innerHTML = '00';
  }
}

export function getTime() {
  return currentTime;
}
