const serverUpdateRoute = (io, room, payload) => {
  console.log('reached serverUpdateRoute');
  io.to(room).emit('server.updateRoute', payload);
}

const serverSendMessage = (io, room, payload) => {
  console.log('reached serverSendChat');
  io.to(room).emit('server.sendMessage', payload);
}


export {
  serverUpdateRoute,
  serverSendMessage
};