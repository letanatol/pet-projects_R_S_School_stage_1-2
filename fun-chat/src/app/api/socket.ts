import { state } from '@helpers/State/State';
import { ServerUserType } from '@helpers/types';

export const socket = new WebSocket('ws://localhost:4000');

socket.addEventListener('message', (event: MessageEvent<string>) => {
  const data = JSON.parse(event.data) as ServerUserType;

  if (data.type === 'USER_LOGIN') {
    console.log('message: ', data);
    if (data.payload.user.isLogined) {
      state.updatePage('chatPage');
    }
  } else {
    state.updatePage('loginPage');
  }
});
