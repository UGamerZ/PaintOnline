import { SocketPersonal } from './types/socket';
import { DataDTO } from './types/data';
import { Server } from 'ws';

export function broadcastConnection(msg: DataDTO, server: Server) {
  server.clients.forEach((socket: SocketPersonal) => {
    if (socket.id === msg.id) {
      socket.send(JSON.stringify(msg));
    }
  });
}

export function connectionHandler(
  socket: SocketPersonal,
  msg: DataDTO,
  server: Server,
) {
  socket.id = msg.id;
  broadcastConnection(msg, server);
}
