import { state } from '@helpers/State/State';
import { sessionStorageService } from '@helpers/sessionStorage';
import { EventTypes, MessageMap, MessageType, RequestType, ServerResponseType, UserType } from '@helpers/types';

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

    const messageHistoryForUser = (user: string): RequestType => ({
      id: '',
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: user,
        },
      },
    });

    if (data.type === 'USER_LOGIN') {
      if (data.payload.user?.isLogined) {
        state.updatePage('main');
        window.location.hash = 'main';
        this.wsSend(JSON.stringify(usersActive));
        this.wsSend(JSON.stringify(usersInactive));
      }
    }

    if (data.type === 'USER_LOGOUT') {
      if (!data.payload.user?.isLogined) {
        state.updatePage('login');
        window.location.hash = 'login';
      }
    }

    if (data.type === 'USER_ACTIVE') {
      state.updateUsersActive(data);

      data.payload.users
        ?.filter((user) => user.login !== state.getUser().payload?.user?.login)
        .forEach((user) => this.wsSend(JSON.stringify(messageHistoryForUser(user.login))));
    }

    if (data.type === 'USER_INACTIVE') {
      state.updateUsersInactive(data);

      data.payload.users
        ?.filter((user) => user.login !== state.getUser().payload?.user?.login)
        .forEach((user) => this.wsSend(JSON.stringify(messageHistoryForUser(user.login))));
    }

    if (data.type === 'USER_EXTERNAL_LOGIN') {
      const login = data.payload.user?.login;
      const userFromStorage = sessionStorageService.getUserFromStorage('userForMessages');
      if (login === userFromStorage?.login) {
        const updatedUser = {
          ...userFromStorage,
          isLogined: true,
          login: userFromStorage?.login || '',
        };
        sessionStorageService.saveData('userForMessages', updatedUser);
        state.updateUserForMessages(updatedUser);
      }
      this.wsSend(JSON.stringify(usersActive));
      this.wsSend(JSON.stringify(usersInactive));
    }

    if (data.type === 'USER_EXTERNAL_LOGOUT') {
      const loginLogout = data.payload.user?.login;
      const userFromStorage = sessionStorageService.getUserFromStorage('userForMessages');
      if (loginLogout === userFromStorage?.login) {
        const updatedUser = {
          ...userFromStorage,
          isLogined: false,
          login: userFromStorage?.login || '',
        };
        sessionStorageService.saveData('userForMessages', updatedUser);
        state.updateUserForMessages(updatedUser);
      }
      this.wsSend(JSON.stringify(usersActive));
      this.wsSend(JSON.stringify(usersInactive));
    }

    if (data.type === 'ERROR') {
      if (data.payload.error) {
        console.log(data.payload.error);
      }
    }

    if (data.type === 'MSG_FROM_USER') {
      const transformedMessages = data.payload.messages.reduce<{ [key: string]: MessageType }>((acc, message) => {
        acc[message.id] = message;
        return acc;
      }, {});
      state.updateMessagesHistory(transformedMessages);
    }

    if (data.type === 'MSG_SEND') {
      const { id } = data.payload.message;
      const transformedMessage: { [key: string]: MessageType } = { [id]: data.payload.message };
      state.updateMessagesHistory(transformedMessage);
    }

    if (data.type === 'MSG_READ') {
      const { id, status } = data.payload.message;

      state.updateMessageHistoryById(id, status);
    }

    if (data.type === 'MSG_EDIT') {
      const { id, text } = data.payload.message;

      state.updateMessageHistoryById(id, { isEdited: true }, text);
    }

    if (data.type === 'MSG_DELIVER') {
      const { id } = data.payload.message;
      const messageHistory = state.getMessagesHistory();
      messageHistory[id].status.isDelivered = true;
      state.updateMessagesHistory(messageHistory);
    }

    if (data.type === 'MSG_DELETE') {
      const { id } = data.payload.message;
      const messageHistory = state.getMessagesHistory();
      delete messageHistory[id];
      state.updateMessagesHistory(messageHistory);
    }
  };

  public onOpen = (): void => {
    state.updateModalState(true);
    console.log('socket.readyState', this.socket.readyState);
    console.log('Connection open');
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('message', this.onMessage);

    const user = state.getUser();
    const userFromStorage = sessionStorageService.getUserFromStorage('user');
    if (userFromStorage && userFromStorage.password) {
      user.type = 'USER_LOGIN';
      if (user.payload && user.payload.user) {
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

    window.addEventListener(EventTypes.UpdateUserForMessages, ((event: CustomEvent<{ user: UserType }>) => {
      const messageHistory = {
        id: '',
        type: 'MSG_FROM_USER',
        payload: {
          user: {
            login: '',
          },
        },
      };
      messageHistory.payload.user.login = event.detail.user.login;

      this.wsSend(JSON.stringify(messageHistory));
    }) as EventListener);

    window.addEventListener(EventTypes.UpdateReadMessages, ((event: CustomEvent<{ userMessages: MessageMap }>) => {
      const messageRead = (id: string): RequestType => ({
        id: '',
        type: 'MSG_READ',
        payload: {
          message: {
            id,
          },
        },
      });

      Object.entries(event.detail.userMessages).forEach(([key]) => this.wsSend(JSON.stringify(messageRead(key))));
    }) as EventListener);

    window.addEventListener(EventTypes.UpdateMessage, ((
      event: CustomEvent<{ message: string; user: UserType; id?: string }>
    ) => {
      if (!event.detail.id) {
        const sendingMessage = {
          id: '',
          type: 'MSG_SEND',
          payload: {
            message: {
              to: '',
              text: '',
            },
          },
        };

        sendingMessage.payload.message.text = event.detail.message;
        sendingMessage.payload.message.to = event.detail.user.login;

        this.wsSend(JSON.stringify(sendingMessage));

        return;
      }

      const editingMessage = {
        id: '',
        type: 'MSG_EDIT',
        payload: {
          message: {
            id: '',
            text: '',
          },
        },
      };

      editingMessage.payload.message.id = event.detail.id;
      editingMessage.payload.message.text = event.detail.message;

      this.wsSend(JSON.stringify(editingMessage));
    }) as EventListener);
  }
}

export const chatApi = new WsApi();
