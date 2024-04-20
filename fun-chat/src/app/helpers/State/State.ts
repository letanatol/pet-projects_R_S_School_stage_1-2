import {
  EventTypes,
  StateType,
  RequestType,
  UserType,
  ServerResponseType,
  MessageMap,
  MessageType,
} from '@helpers/types';

class State {
  private state: StateType = {
    page: 'login',
    user: {
      id: '',
      type: '',
      payload: {
        user: {
          login: '',
          password: '',
        },
      },
    },
    userForMessages: {
      login: '',
      password: '',
      isLogined: false,
    },
    message: '',
    messageID: '',
    messagesHistory: {},
    chatFieldHint: 'Select the user to send the message...',
    usersActive: [],
    usersInactive: [],
    modalStateHidden: true,
  };

  public updateMessageID = (id: string): void => {
    this.state.messageID = id;
  };

  public updateMessagesHistory = (messages: { [key: string]: MessageType }, replaceAll: boolean = false): void => {
    if (replaceAll) {
      this.state.messagesHistory = messages;
    } else {
      const updatedMessagesHistory = { ...this.state.messagesHistory };

      Object.entries(messages).forEach(([messageId, message]) => {
        updatedMessagesHistory[messageId] = message;
      });

      this.state.messagesHistory = updatedMessagesHistory;
    }

    window.dispatchEvent(new CustomEvent(EventTypes.UpdateMessagesHistory, { bubbles: true, detail: {} }));
  };

  public updateMessage = (message: string): void => {
    this.state.message = message;

    window.dispatchEvent(
      new CustomEvent(EventTypes.UpdateMessage, {
        bubbles: true,
        detail: { message, user: this.state.userForMessages },
      })
    );
  };

  public updateUserForMessages = (user: UserType): void => {
    this.state.userForMessages = user;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUserForMessages, { bubbles: true, detail: { user } }));
  };

  public updateModalState = (state: boolean): void => {
    this.state.modalStateHidden = state;

    window.dispatchEvent(new CustomEvent(EventTypes.UpdateModalState, { bubbles: true, detail: {} }));
  };

  public updateUsersActive = (data: ServerResponseType): void => {
    if (data.payload && data.payload.users) {
      this.state.usersActive = data.payload.users;
    }

    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUsersActive, { bubbles: true, detail: {} }));
  };

  public updateUsersInactive = (data: ServerResponseType): void => {
    if (data.payload && data.payload.users) {
      this.state.usersInactive = data.payload.users;
    } else {
      this.state.usersInactive = [];
    }

    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUsersInactive, { bubbles: true, detail: {} }));
  };

  public updatePage = (page: string): void => {
    this.state.page = page;

    window.location.hash = page;

    window.dispatchEvent(new CustomEvent(EventTypes.UpdatePage, { bubbles: true, detail: {} }));
  };

  public updateUser = (login: string, password: string): void => {
    if (this.state.user.payload !== null) {
      this.state.user.payload.user.login = login;
      this.state.user.payload.user.password = password;

      window.dispatchEvent(new CustomEvent(EventTypes.UpdateUser, { bubbles: true, detail: {} }));
    }
  };

  public getMessageID = (): string => this.state.messageID;

  public getMessagesHistory = (): MessageMap => this.state.messagesHistory;

  public getUserForMessages = (): UserType => this.state.userForMessages;

  public getModalState = (): boolean => this.state.modalStateHidden;

  public getUsersActive = (): UserType[] => this.state.usersActive ?? [];

  public getUsersInactive = (): UserType[] => this.state.usersInactive ?? [];

  public getPage = (): string => this.state.page;

  public getUser = (): RequestType => this.state.user;

  public getState = (): void => {
    console.log(this.state);
  };
}

const state = new State();

export { state };
