// import {
//   serverUpdateRoute,
//   serverSendChat,
//   serverSendComment
// } from './serverEvents';

import { serverUpdateRoute } from './serverEvents';

const clientUpdateRoute = ({ io, room }, payload) => {
  console.log('reached clientUpdateRoute');
  serverUpdateRoute(io, room, payload);
}

const clientSendChat = ({ io, room }, payload) => {
  console.log('reached clientSendChat');
}

const clientSendComment = ({ io, room }, payload) => {
  console.log('reached clientSendComment');
}

export default {
  'client.updateRoute': clientUpdateRoute,
  'client.sendChat': clientSendChat,
  'client.sendComment': clientSendComment
};