import { state } from '@helpers/State/State';
import { ServerResponseType } from '@helpers/types';
// import { wait } from '@helpers/utils';

// const RETRY_INTERVAL = 100;

export const socket = new WebSocket('ws://localhost:4000');

export function onMessage(event: MessageEvent<string>): void {
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
      socket.send(JSON.stringify(usersActive));
      socket.send(JSON.stringify(usersInactive));
    }
  }

  if (data.type === 'USER_LOGOUT') {
    if (!data.payload.user?.isLogined) {
      state.updatePage('loginPage');
      socket.send(JSON.stringify(usersActive));
      socket.send(JSON.stringify(usersInactive));
    }
  }

  if (data.type === 'USER_ACTIVE') {
    state.updateUsersActive(data);
  }

  if (data.type === 'USER_INACTIVE') {
    state.updateUsersInactive(data);
  }

  if (data.type === 'USER_EXTERNAL_LOGIN') {
    socket.send(JSON.stringify(usersActive));
    socket.send(JSON.stringify(usersInactive));
  }

  if (data.type === 'USER_EXTERNAL_LOGOUT') {
    socket.send(JSON.stringify(usersActive));
    socket.send(JSON.stringify(usersInactive));
  }
}

export function onOpen(): void {
  // socket.addEventListener('close', onClose);
  socket.addEventListener('message', onMessage);
}

// export async function onClose(): Promise<void> {
//   socket.removeEventListener('open', onOpen);
//   // socket.removeEventListener('close', onClose);
//   socket.removeEventListener('message', onMessage);

//   await wait(RETRY_INTERVAL);

//   socket.addEventListener('open', onOpen);
// }

socket.addEventListener('open', () => {
  onOpen();
});
