import { useSession } from 'next-auth/react';
import Head from 'next/head';

import { cn } from '@/lib/utils';
import SendMessageForm from '@/pages/_components/SendMessageForm';
import { useReceiveMessage } from '@/hooks/socket';
import ShowSelf from '@/pages/_components/ShowSelf';
import { useEffect } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Secret Chat</title>
        <meta name="description" content="Secret Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={cn('min-h-screen', 'flex flex-col items-center')}>
        <div className={cn('flex flex-col items-center justify-center', 'px-4 pt-16')}>
          <div className={cn('flex justify-center')}>
            {/* 用户列表 */}
            <div className={cn('hidden w-44 sm:block')}>
              <div className={cn('flex flex-col', 'sticky top-16')}>
                <ShowSelf />
              </div>
            </div>

            {/* 消息列表 */}
            <div className={cn('w-full sm:w-[30rem]')}>
              <div className={cn('mb-28 pt-10')}>
                <MessageList />
              </div>
            </div>

            <div
              className={cn(
                'fixed bottom-0 left-0',
                'w-screen bg-background/70 backdrop-blur',
                'flex flex-col items-center justify-center',
                'px-4'
              )}
            >
              <UserInterface />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/** 消息列表 */
function MessageList() {
  const { messages } = useReceiveMessage();

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className={cn('flex flex-col gap-3')}>
      {messages?.map((message) => {
        return (
          <div key={message.id} className={cn('flex flex-col', 'rounded-lg bg-secondary/60 p-3')}>
            <div>
              <div className={cn('mb-3')}>{message.sender.name}</div>
              <div>{message.content}</div>
            </div>

            <div className={cn('text-xs text-muted-foreground', 'self-end', 'mt-2')}>
              {message.createdAt.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** 用户界面 */
function UserInterface() {
  const { data: sessionData } = useSession();

  return (
    <div className={cn('w-full sm:w-auto gap-4', 'pl-0 sm:pl-44')}>
      <div className={cn('w-full sm:w-[30rem]', 'h-28', 'flex items-center justify-center')}>
        {sessionData && <SendMessageForm />}
      </div>
    </div>
  );
}
