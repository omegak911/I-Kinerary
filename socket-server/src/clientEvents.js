import { 
  serverUpdateRoute,
  serverSendMessage
} from './serverEvents';

const clientUpdateRoute = ({ io, room }, payload) => {
  console.log('reached clientUpdateRoute');
  serverUpdateRoute(io, room, payload);
}

const clientSendMessage = ({ io, room }, payload) => {
  serverSendMessage(io, room, payload);
}

export default {
  'client.updateRoute': clientUpdateRoute,
  'client.sendMessage': clientSendMessage,
};