'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { socket } from '@/pages/_app';
import Image from 'next/image';

type ShowSelfProps = React.HTMLProps<HTMLDivElement>;

/** 显示自己 */
const ShowSelf = (props: ShowSelfProps) => {
  const { className } = props;

  const { data: sessionData } = useSession();

  /** 退出登录 */
  const onSignOut = async () => {
    await signOut();
    socket.emit('user:disconnect', sessionData?.user?.id);
  };

  useEffect(() => {
    // 当前用户连接时，发送用户信息
    if (sessionData?.user) {
      socket.emit('user:connect', sessionData.user);
    }

    return () => {
      if (sessionData?.user) {
        socket.emit('user:disconnect', sessionData.user.id);
      }
    };
  }, [sessionData?.user]);

  if (!sessionData) {
    return (
      <div className={cn(className)}>
        <Button variant="outline" onClick={() => void signIn()}>
          登录
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('inline-block', className)}>
        <div
          className={cn(
            'flex items-center justify-between gap-2',
            'p-3',
            'hover:bg-muted/40',
            'rounded-lg',
            'transition-all duration-300'
          )}
        >
          <div className={cn('flex items-center gap-3', 'select-none')}>
            <Image
              className={cn('rounded-full', 'size-12')}
              src={sessionData?.user?.image ?? ''}
              alt="avatar"
              width={100}
              height={100}
            />

            <div className={cn('flex flex-col gap-1', 'text-left')}>
              <span className={cn('text-sm font-bold')}>{sessionData?.user?.name}</span>
              <span className={cn('text-xs text-muted-foreground')}>在线</span>
            </div>
          </div>

          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>我的信息</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>退出登陆</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShowSelf;
