'use client';

import { useEffect, useState } from 'react';
import { login, logout, me, signUp } from '../services/auth.services';
import { tokenStorage } from '../utils/token';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 사용자 정보 로드
    const loadUser = async () => {
      const token = tokenStorage.get();
      if (token) {
        const userData = await me();
        setUser(userData);
      }
      setLoading(false);
    };

    loadUser();

    // 토큰 변경 이벤트 리스너
    const handleAuthChange = (event: CustomEvent) => {
      if (event.detail.isLoggedIn) {
        me().then(setUser);
      } else {
        setUser(null);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:changed', handleAuthChange as EventListener);
      return () => {
        window.removeEventListener('auth:changed', handleAuthChange as EventListener);
      };
    }
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