'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSessionClient, getUser } from '@/lib/api/clientApi';
import Loader from '@/app/loading';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const sessionValid = await checkSessionClient();

        if (sessionValid) {
          const user = await getUser();
          if (user) {
            setUser(user);
          } else {
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error('AuthProvider verification error:', error);
        clearIsAuthenticated();
      } finally {
        setChecking(false);
      }
    };
    verify();
  }, [setUser, clearIsAuthenticated]);

  if (checking) return <Loader />;

  return <>{children}</>;
}
