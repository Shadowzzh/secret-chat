import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';

import { z } from 'zod';

/**
 * 消息路由器
 * 提供发送消息的功能
 */
export const messageRouter = createTRPCRouter({
  /**
   * 发送消息的过程
   * 需要输入消息内容
   */
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.db.message.create({
        data: {
          content: input.message,
          senderId: ctx.session.user.id,
        },
      });

      return { ...message, sender: ctx.session.user };
    }),

  /**
   * 获取所有消息的过程
   */
  getAllMessages: publicProcedure.query(({ ctx }) => {
    return ctx.db.message.findMany({
      include: {
        sender: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
});
