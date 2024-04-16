import { EventTypes, StateType, RequestType, UserType, ServerResponseType } from '@helpers/types';

class State {
  private state: StateType = {
    page: 'loginPage',
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
    usersActive: [],
    usersInactive: [],
    modalStateHidden: true,
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

    window.dispatchEvent(new CustomEvent(EventTypes.UpdatePage, { bubbles: true, detail: {} }));
  };

  public updateUser = (login: string, password: string): void => {
    if (this.state.user.payload !== null) {
      this.state.user.payload.user.login = login;
      this.state.user.payload.user.password = password;

      window.dispatchEvent(new CustomEvent(EventTypes.UpdateUser, { bubbles: true, detail: {} }));
    }
  };

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
