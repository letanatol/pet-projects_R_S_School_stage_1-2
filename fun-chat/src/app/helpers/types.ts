export type StateType = {
  page: string;
  user: RequestType;
  userForMessages: UserType;
  usersActive: UserType[] | null;
  usersInactive: UserType[] | null;
  modalStateHidden: boolean;
};

export type UserType = {
  login: string;
  password?: string;
  isLogined?: boolean;
};

export type UsersActive = {
  id: null;
  type: string;
  payload: {
    users: UserType[];
  };
};

export type RequestType = {
  id: string | null;
  type: string;
  payload: {
    user: UserType;
  } | null;
};

export type ServerResponseType = {
  id: string | null;
  type: string;
  payload: {
    user?: UserType;
    users?: UserType[];
    error?: string;
  };
};

export enum SocketTypes {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_ACTIVE = 'USER_ACTIVE',
  USER_INACTIVE = 'USER_INACTIVE',
  USER_EXTERNAL_LOGIN = 'USER_EXTERNAL_LOGIN',
  USER_EXTERNAL_LOGOUT = 'USER_EXTERNAL_LOGOUT',
  ERROR = 'ERROR',
}

export enum EventTypes {
  UpdateUser = 'UpdateUser',
  UpdateUserForMessages = 'UpdateUserForMessages',
  UpdatePage = 'UpdatePage',
  UpdateUsersActive = 'UpdateUsersActive',
  UpdateUsersInactive = 'UpdateUsersInactive',
  UpdateModalState = 'UpdateModalState',
}
