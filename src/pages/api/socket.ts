import { Server as ServerIO } from 'socket.io';
import { type Http2Server } from 'http2';
import { type Server as NetServer, type Socket } from 'net';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type Server as SocketIOServer } from 'socket.io';
import { broadcastMessageHandler, onlineUserHandler } from '@/server/socketHandlers';

type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIo) {
  /** 如果已经初始化，则直接返回 */
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const path = '/api/socket';
  const httpServer = res.socket.server as unknown as Http2Server;

  const io = new ServerIO(httpServer, { path });
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    broadcastMessageHandler(io, socket);
    onlineUserHandler(io, socket);
  });

  res.end();
}
