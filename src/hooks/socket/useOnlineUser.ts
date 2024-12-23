import { type OnlineUser } from '@/server/socketHandlers';
import { socket } from '@/pages/_app';
import { useEffect, useState } from 'react';

/** 在线用户 */
export const useOnlineUser = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    // 用户连接
    socket.on('user:update', (user: OnlineUser[]) => {
      console.log('🚀 ~ socket.on ~ user:', user);
      setOnlineUsers(user);
    });

    // 用户断开连接
    socket.on('user:disconnect', (userId: string) => {
      setOnlineUsers((prev) => prev.filter((user) => user.id !== userId));
    });

    return () => {
      socket.off('user:update');
      socket.off('user:disconnect');
    };
  }, []);

  return {
    onlineUsers,
  };
};
