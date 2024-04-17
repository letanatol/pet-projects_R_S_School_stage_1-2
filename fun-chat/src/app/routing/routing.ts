import { state } from '@helpers/State/State';
import { sessionStorageService } from '@helpers/sessionStorage';
import { UserType } from '@helpers/types';
import { chatApi } from '../api/socket';

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#login') {
    const user = state.getUser();
    const userFromStorage = getUserFromStorage();
    if (userFromStorage && userFromStorage.password) {
      user.type = 'USER_LOGOUT';
      if (user.payload) {
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

export function getUserFromStorage(): UserType | null {
  const user = sessionStorageService.getData<UserType>('user');

  if (user) {
    return user;
  }

  return null;
}
