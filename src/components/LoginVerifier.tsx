'use client';

import React, { createContext, useEffect, useState } from 'react';
import * as schema from '../../drizzle/schema';
import { usePathname, useRouter } from 'next/navigation';

export const userContext = createContext<{
  user: typeof schema.users.$inferSelect | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<typeof schema.users.$inferSelect | undefined>
  >;
  logout: () => void;
}>({ user: undefined, setUser: () => {}, logout: () => {} });

export default function LoginVerifier({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<typeof schema.users.$inferSelect>();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/login-user' && !user) router.push('/login-user');
    setIsLoading(false);
  }, [pathname, user]);

  const logout = () => {
    setUser(undefined);
    router.push('/login-user');
  };

  return (
    <userContext.Provider value={{ user, setUser, logout }}>
      {isLoading ? <p>Loading</p> : children}
    </userContext.Provider>
  );
}
