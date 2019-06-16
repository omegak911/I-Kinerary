import http from 'http';
import SocketIO from 'socket.io';

import clientEvents from './clientEvents';

const PORT = 3009;
const server = http.createServer();
const io = SocketIO(server);

io.on('connection', (client) => {
  let room = client.handshake.query.roomId;
  client.join(room);

  Object.keys(clientEvents).forEach(event => {
    client.on(event, payload => {
      clientEvents[event]({ io, room }, payload);
    })
  })

  client.on('disconnect', () => {
    console.log(`client disconnected`)
  })
})

server.listen(PORT, () => console.log('socket IO server is operational'));