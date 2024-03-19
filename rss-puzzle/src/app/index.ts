import { state } from '@helpers/State/State';
import { App } from './app';
import './global.scss';
import './components/sourceBlock/sourceBlock';

const startGame = new App();
startGame.drawMainContainer();
startGame.customEvents();

window.addEventListener('click', () => {
  state.getState();
});
