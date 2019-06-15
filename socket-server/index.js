import http from 'http';
import SocketIO from 'socket.io';

const PORT = 3009;
const server = http.createServer();
const io = SocketIO(server);

io.on('connection', (socket) => {
  console.log('user is connected')
})

server.listen(PORT, () => console.log('socket IO server is operational'));

//handshake
//rooms


//for loop to run events thru