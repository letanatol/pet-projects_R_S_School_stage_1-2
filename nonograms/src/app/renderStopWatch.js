const stopWatchSection = document.createElement('section');

function renderStopWatch() {
  
  stopWatchSection.classList.add('section', 'stop-watch');

  const stopWatchWrapper = document.createElement('div');
  stopWatchWrapper.classList.add('stop-watch__wrapper');

  const timeMinutes = document.createElement('span');
  timeMinutes.classList.add('stop-watch__time', 'time-minutes');
  timeMinutes.innerText = '00';

  const colon = document.createElement('span');
  colon.classList.add('colon');
  colon.innerText = ':';

  const timeSeconds = document.createElement('span');
  timeSeconds.classList.add('stop-watch__time', 'time-seconds');
  timeSeconds.innerText = '00';
  stopWatchSection.append(stopWatchWrapper);
  stopWatchWrapper.append(timeMinutes);
  stopWatchWrapper.append(colon);
  stopWatchWrapper.append(timeSeconds);
}

export { stopWatchSection, renderStopWatch };