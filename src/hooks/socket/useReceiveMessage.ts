import { socket } from '@/pages/_app';
import { type IMessage } from '@/server/socketHandlers';
import { api } from '@/utils/api';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

/**
 * 接收消息
 * @returns
 */
export const useReceiveMessage = () => {
  const utils = api.useUtils();
  const { data: messages } = api.message.getAllMessages.useQuery();

  useEffect(() => {
    socket.on('receive-message', async (newMessage: IMessage) => {
      // 执行更新
      utils.message.getAllMessages.setData(undefined, (old) => {
        if (!old) return [newMessage];
        return [...old, newMessage];
      });
    });

    return () => {
      socket.off('receive-message');
    };
  }, [utils.message.getAllMessages]);

  return { messages };
};
