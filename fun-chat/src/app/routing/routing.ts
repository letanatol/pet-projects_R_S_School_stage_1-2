import { state } from '@helpers/State/State';
import { sessionStorageService } from '@helpers/sessionStorage';
// import { chatApi } from '../api/socket';

window.addEventListener('hashchange', () => {
  if (['#login', '#main'].includes(window.location.hash)) {
    const userFromStorage = sessionStorageService.getUserFromStorage('user');
    if (userFromStorage && userFromStorage.password) {
      state.updatePage('main');
    }
  }

  if (window.location.hash === '#about') {
    state.updatePage('about');
  }
});
