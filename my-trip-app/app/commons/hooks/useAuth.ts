'use client';

import { useEffect, useState } from 'react';
import { login, logout, me, signUp } from '../services/auth.services';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me().then(setUser).finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    login: async (email: string, password: string) => {
      await login(email, password);
      const u = await me();
      setUser(u);
    },
    signUp: async (input: { email: string; name: string; password: string }) => {
      await signUp(input);
    },
    logout: () => {
      logout();
      setUser(null);
    },
  };
}