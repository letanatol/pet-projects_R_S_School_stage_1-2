import { state } from '@helpers/State/State';
import { sessionStorageService } from '@helpers/sessionStorage';
import { RequestType, ServerResponseType, UserType } from '@helpers/types';

const RETRY_INTERVAL = 1000;

class WsApi {
  private socket: WebSocket = new WebSocket('ws://localhost:4000');

  constructor() {
    this.addListeners();

    this.socket.addEventListener('error', (event) => {
      console.log(event);
    });
  }

  public onMessage = (event: MessageEvent<string>): void => {
    const data = JSON.parse(event.data) as ServerResponseType;
    console.log('onMessage', data);

    const usersActive = {
      id: '',
      type: 'USER_ACTIVE',
      payload: null,
    };

    const usersInactive = {
      id: '',
      type: 'USER_INACTIVE',
      payload: null,
    };

    if (data.type === 'USER_LOGIN') {
      if (data.payload.user?.isLogined) {
        state.updatePage('chatPage');
        this.wsSend(JSON.stringify(usersActive));
        this.wsSend(JSON.stringify(usersInactive));
      }
    }

    if (data.type === 'USER_LOGOUT') {
      if (!data.payload.user?.isLogined) {
        state.updatePage('loginPage');
      }
    }

    if (data.type === 'USER_ACTIVE') {
      state.updateUsersActive(data);
    }

    if (data.type === 'USER_INACTIVE') {
      state.updateUsersInactive(data);
    }

    if (data.type === 'USER_EXTERNAL_LOGIN') {
      this.wsSend(JSON.stringify(usersActive));
      this.wsSend(JSON.stringify(usersInactive));
    }

    if (data.type === 'USER_EXTERNAL_LOGOUT') {
      this.wsSend(JSON.stringify(usersActive));
      this.wsSend(JSON.stringify(usersInactive));
    }

    if (data.type === 'ERROR') {
      if (data.payload.error) {
        console.log(data.payload.error);
      }
    }
  };

  public onOpen = (): void => {
    state.updateModalState(true);
    console.log('socket.readyState', this.socket.readyState);
    console.log('Connection open');
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('message', this.onMessage);

    const user = state.getUser();
    const userFromStorage = this.getUserFromStorage();
    if (userFromStorage && userFromStorage.password) {
      user.type = 'USER_LOGIN';
      if (user.payload) {
        user.payload.user.login = userFromStorage.login;
        user.payload.user.password = userFromStorage.password;
        this.wsSend(JSON.stringify(user));
      }
    }
  };

  public onClose = (): void => {
    console.log('Connection close');
    console.log('socket.readyState', this.socket.readyState);
    this.socket.removeEventListener('open', this.onOpen);
    this.socket.removeEventListener('close', this.onClose);
    this.socket.removeEventListener('message', this.onMessage);
    state.updateModalState(false);

    this.waitForConnection(() => console.log('reconnected'), RETRY_INTERVAL);
  };

  public wsSend(message: string): void {
    this.waitForConnection(() => {
      this.socket.send(message);
    }, RETRY_INTERVAL);
  }

  private waitForConnection(callback: () => void, interval: number): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      callback();

      return;
    }

    if (this.socket.readyState === WebSocket.CLOSED) {
      console.log('WS closed, reopen');

      this.socket = new WebSocket('ws://localhost:4000');
      this.socket.addEventListener('error', (event) => {
        console.log(event);
      });
      this.socket.addEventListener('open', this.onOpen);

      setTimeout(() => {
        this.waitForConnection(callback, interval);
      }, interval);

      return;
    }

    console.log('Waiting');
    setTimeout(() => {
      this.waitForConnection(callback, interval);
    }, interval);
  }

  private addListeners(): void {
    this.socket.addEventListener('open', this.onOpen);
  }

  public getUserFromStorage(): UserType | null {
    const user = sessionStorageService.getData<UserType>('user');

    if (user) {
      return user;
    }

    return null;
  }

  public getActiveUsers(): void {
    const userActive = {
      id: '',
      type: 'USER_ACTIVE',
      payload: null,
    };

    this.wsSend(JSON.stringify(userActive));
  }

  public loginUser(user: RequestType): void {
    this.wsSend(JSON.stringify(user));
  }
}

export const chatApi = new WsApi();
