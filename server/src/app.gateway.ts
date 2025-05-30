import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { DataDTO } from './types/data';
import { SocketPersonal } from './types/socket';
import { broadcastConnection, connectionHandler } from './socket-functions';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  handleConnection(@ConnectedSocket() client: SocketPersonal) {
    client.on('message', (data) => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string,@typescript-eslint/no-unsafe-assignment
      const parsedData: DataDTO = JSON.parse(data.toString());
      switch (parsedData.method) {
        case 'connection':
          connectionHandler(client, parsedData, this.server);
          break;
        case 'draw':
          broadcastConnection(parsedData, this.server);
          break;
      }
    });
  }
}
