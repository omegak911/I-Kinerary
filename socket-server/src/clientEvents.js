import axios from 'axios';

import server_comment_URL from '../config';

import { 
  serverUpdateRoute,
  serverSendMessage
} from './serverEvents';

const clientUpdateRoute = ({ io, room }, payload) => {
  serverUpdateRoute(io, room, payload);
}

const clientSendMessage = ({ io, room }, payload) => {
  if (payload.type === 'Comments') {
    axios
      .post(server_comment_URL, payload)
      .then(() => serverSendMessage(io, room, payload))
      .catch(err => console.error('clientSendMessage err: ', err))
  } else  {
    serverSendMessage(io, room, payload);
  }
}

export default {
  'client.updateRoute': clientUpdateRoute,
  'client.sendMessage': clientSendMessage,
};