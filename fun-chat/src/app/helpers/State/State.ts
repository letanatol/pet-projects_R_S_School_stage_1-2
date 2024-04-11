import { EventTypes, StateType, UserType } from '@helpers/types';

class State {
  private state: StateType = {
    page: '',
    user: {
      id: '',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: '',
          password: '',
        },
      },
    },
  };

  public updatePage = (page: string): void => {
    this.state.page = page;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdatePage, { bubbles: true, detail: {} }));
  };

  public getPage = (): string => this.state.page;

  public getUser = (): UserType => this.state.user;

  public upDateUser = (name: string, password: string): void => {
    this.state.user.payload.user.login = name;
    this.state.user.payload.user.password = password;
    window.dispatchEvent(new CustomEvent(EventTypes.UpdateUser, { bubbles: true, detail: {} }));
  };

  public getState = (): void => {
    console.log(this.state);
  };
}

const state = new State();

export { state };
