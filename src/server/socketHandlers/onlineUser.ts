import { type DefaultSession } from 'next-auth';
import { type Socket } from 'socket.io';
import { type Server as ServerIO } from 'socket.io';

/** 在线用户 */
export type OnlineUser = DefaultSession['user'] & {
  id: string;
};

/** 在线用户 - 用户 id -> 用户信息 */
const onlineUsers = new Map<string, OnlineUser>();

/**
 * 广播消息
 * @param io
 * @param socket
 */
export function onlineUserHandler(io: ServerIO, socket: Socket) {
  // 用户连接
  socket.on('user:connect', (user: OnlineUser) => {
    onlineUsers.set(user.id, user);
    io.emit('user:update', Array.from(onlineUsers.values()));
  });

  // 用户断开连接
  socket.on('user:disconnect', (userId: string) => {
    onlineUsers.delete(userId);
    io.emit('user:update', Array.from(onlineUsers.values()));
  });

  // 断开连接时清理
  socket.on('disconnect', () => {
    // 获取用户列表
    const userList = Array.from(onlineUsers.entries());

    // 找到断开连接的用户
    const userId = userList.find(([_, user]) => user.id === socket.id)?.[0];

    // 如果找到，则删除
    if (userId) {
      onlineUsers.delete(userId);
      io.emit('user:update', Array.from(onlineUsers.values()));
    }
  });
}
