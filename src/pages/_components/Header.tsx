import { memo } from 'react';
import { ToggleTheme } from '@/pages/_components/toggle-theme';
import { cn } from '@/lib/utils';

/**
 * 头部
 */
const Header = memo(() => {
  return (
    <div
      className={cn(
        'fixed px-6',
        'h-16',
        'flex items-center justify-between',
        'w-screen',
        'bg-background/70 backdrop-blur'
      )}
    >
      <h1 className={cn('text-lg sm:text-xl', 'flex items-center justify-center gap-2')}>
        <span className={cn('text-[hsl(280,100%,70%)]')}>Secret</span> Chat
      </h1>

      <ToggleTheme />
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
