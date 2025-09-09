'use client';

import { useEffect, useState } from 'react';
import { login, logout, me, signUp } from '../services/auth.services';
import { tokenStorage } from '../utils/token';
import { User, SignUpInput, AuthState } from '../../_types/auth';

export function useAuth(): AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = tokenStorage.get();
    if (token) {
      const userData = await me();
      setUser(userData);
    }
    setLoading(false);
  };

  const refreshUser = async () => {
    const userData = await me();
    setUser(userData);
  };

  useEffect(() => {
    loadUser();

    // 토큰 변경 이벤트 리스너
    const handleAuthChange = (event: CustomEvent) => {
      if (event.detail.isLoggedIn) {
        me().then(setUser);
      } else {
        setUser(null);
      }
    };

    // 스토리지 변경 이벤트 리스너 (다른 탭에서의 로그인/로그아웃)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          me().then(setUser);
        } else {
          setUser(null);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:changed', handleAuthChange as EventListener);
      window.addEventListener('storage', handleStorage);
      
      return () => {
        window.removeEventListener('auth:changed', handleAuthChange as EventListener);
        window.removeEventListener('storage', handleStorage);
      };
    }
  }, []);

  return {
    user,
    loading,
    isLoggedIn: !!user,
    login: async (email: string, password: string) => {
      await login(email, password);
      const userData = await me();
      setUser(userData);
    },
    signUp: async (input: SignUpInput) => {
      await signUp(input);
    },
    logout: () => {
      logout();
      setUser(null);
    },
    refreshUser,
  };
}