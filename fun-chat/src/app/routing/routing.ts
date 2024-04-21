import { state } from '@helpers/State/State';
import { sessionStorageService } from '@helpers/sessionStorage';
import { chatApi } from '../api/socket';

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#login') {
    const user = state.getUser();
    const userFromStorage = sessionStorageService.getUserFromStorage('user');
    if (userFromStorage && userFromStorage.password) {
      user.type = 'USER_LOGOUT';
      if (user.payload && user.payload.user) {
        user.payload.user.login = userFromStorage.login;
        user.payload.user.password = userFromStorage.password;
        chatApi.wsSend(JSON.stringify(user));
        sessionStorageService.clearData();
        state.updatePage('login');
      }
    }
    sessionStorageService.clearData();
    state.updatePage('login');
  }

  if (window.location.hash === '#about') {
    state.updatePage('about');
  }
});
