const serverUpdateRoute = (io, room, payload) => {
  console.log('reached serverUpdateRoute');
  io.to(room).emit('server.updateRoute', payload);
}

const serverSendChat = (io, room, payload) => {
  console.log('reached serverSendChat');
}

const serverSendComment = (io, room, payload) => {
  console.log('reached serverSendComment');
}

export {
  serverUpdateRoute,
  serverSendChat,
  serverSendComment
};