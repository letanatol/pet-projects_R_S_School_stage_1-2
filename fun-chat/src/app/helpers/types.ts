export type StateType = {
  page: string;
  user: UserType;
};

export type UserType = {
  id: string;
  type: string;
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
};

export type ServerUserType = {
  id: string;
  type: string;
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
};

export enum EventTypes {
  UpdateUser = 'UpdateUser',
  UpdatePage = 'UpdatePage',
}
