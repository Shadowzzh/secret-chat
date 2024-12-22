'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/utils/api';
import { socket } from '@/pages/_app';
import { cn } from '@/lib/utils';

interface SendMessageFormProps {
  onSuccess?: () => void;
}

const FormSchema = z.object({
  message: z.string().min(2, {
    message: '消息不能为空',
  }),
});

/** 发送信息表单 */
const SendMessageForm = (props: SendMessageFormProps) => {
  const { onSuccess } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  /** 发送消息 */
  const createMessage = api.message.sendMessage.useMutation({
    onError() {
      toast('消息发送失败');
    },
    onSuccess: (data) => {
      // 广播消息
      socket.emit('broadcast-message', data);
      // 清空输入框
      form.reset();
      // 调用 onSuccess 回调
      onSuccess?.();
    },
  });

  /** 提交表单 */
  function onSubmit(data: z.infer<typeof FormSchema>) {
    createMessage.mutate({ message: data.message });
  }

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full items-center', 'gap-2')}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className={cn('flex-1')}>
              <FormControl>
                <Input placeholder="请输入消息" {...field} disabled={createMessage.isPending} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          className={cn('shrink-0')}
          type="submit"
          variant="secondary"
          disabled={createMessage.isPending}
        >
          {createMessage.isPending ? '发送中...' : '发送'}
        </Button>
      </form>
    </Form>
  );
};

export default SendMessageForm;
