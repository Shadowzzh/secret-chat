import { GeistSans } from 'geist/font/sans';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';

import { api } from '@/utils/api';

import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { io } from 'socket.io-client';
import { SocketProvider } from '@/context/SocketContext';
import Header from '@/pages/_components/Header';

export const socket = io({
  path: '/api/socket',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <SocketProvider>
          <Header />

          <div className={GeistSans.className}>
            <Component {...pageProps} />
          </div>

          <Toaster />
        </SocketProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
