import { App } from './app';
import './global.scss';
import './components/sourceBlock/sourceBlock';

const startGame = new App();
startGame.drawMainContainer();
startGame.customEvents();
