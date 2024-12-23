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

/** 显示自己 */
const ShowSelf = () => {
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

  if (!sessionData)
    return (
      <Button variant="default" onClick={() => void signIn()}>
        登录
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('inline-block')}>
        <div className={cn('flex items-center gap-2', 'px-2 py-1')}>
          {sessionData?.user?.name}
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
