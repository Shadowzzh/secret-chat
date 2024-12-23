import { useOnlineUser } from '@/hooks/socket';
import { cn } from '@/lib/utils';

/** 在线用户 */
const OnlineUser = () => {
  const { onlineUsers } = useOnlineUser();

  return (
    <div className={cn('flex flex-col gap-2')}>
      {onlineUsers.map((user) => (
        <div className={cn('rounded-lg bg-secondary/30', 'p-4')} key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default OnlineUser;
