import http from 'http';
import SocketIO from 'socket.io';

const PORT = 3009;
const server = http.createServer();
const io = SocketIO(server);

io.on('connection', (client) => {
  console.log('user is connected')

  client.on('event', data => {
    console.log(`client event data: ${data}`)
  })

  client.on('client.updateRoute', data => {
    console.log(`client updateRoute: ${data}`)
  })

  client.on('disconnect', () => {
    console.log(`client disconnected`)
  })
})

server.listen(PORT, () => console.log('socket IO server is operational'));

//handshake
//rooms


//for loop to run events thru