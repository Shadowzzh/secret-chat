import { type RouterOutputs } from '@/utils/api';
import { type Socket } from 'socket.io';
import { type Server as ServerIO } from 'socket.io';

export type IMessage = RouterOutputs['message']['getAllMessages'][0];

/**
 * 广播消息
 * @param io
 * @param socket
 */
export function broadcastMessageHandler(io: ServerIO, socket: Socket) {
  socket.on('broadcast-message', (msg) => {
    io.emit('receive-message', msg);
  });
}
