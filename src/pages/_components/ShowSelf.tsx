import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, CornerLeftDownIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

/** 显示自己 */
const ShowSelf = () => {
  const { data: sessionData } = useSession();

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
        <DropdownMenuItem onClick={() => void signOut()}>退出登陆</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShowSelf;
