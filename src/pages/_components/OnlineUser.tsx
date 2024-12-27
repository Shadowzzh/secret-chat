import { memo } from 'react';
import { useOnlineUser } from '@/hooks/socket';
import { cn } from '@/lib/utils';
import { type UserStatus } from '@/server/socketHandlers';
import { PersonIcon } from '@radix-ui/react-icons';

/** 在线用户 */
const OnlineUser = memo(() => {
  const { onlineUsers } = useOnlineUser();

  return (
    <div className={cn('flex flex-col gap-2', 'select-none', 'pl-3')}>
      <div className={cn('flex items-center gap-2', 'mb-2 ml-3')}>
        <PersonIcon className="size-4" />
        <span className={cn('text-sm font-bold text-primary/80')}>在线用户</span>
      </div>

      {onlineUsers.map((user) => (
        <div
          className={cn(
            'flex items-center justify-between',
            'rounded-lg hover:bg-muted/40',
            'transition-all duration-300',
            'border border-muted/80 p-4',
            'cursor-pointer'
          )}
          key={user.id}
        >
          {user.name}
          <Tag status={user.status} />
        </div>
      ))}
    </div>
  );
});

OnlineUser.displayName = 'OnlineUser';

/** 用户状态标签 */
function Tag({ status }: { status: UserStatus }) {
  return (
    <div
      data-status={status}
      className={cn(
        'size-2 rounded-full',
        'data-[status=online]:bg-green-500',
        'data-[status=away]:bg-yellow-500'
      )}
    />
  );
}

export default OnlineUser;
