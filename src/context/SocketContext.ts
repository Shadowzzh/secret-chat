import { useEffect } from 'react';

export function SocketProvider(props: { children: React.ReactNode }) {
  useEffect(() => {
    void fetch('/api/socket');
  }, []);

  return props.children;
}
