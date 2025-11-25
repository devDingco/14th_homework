'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { tokenStorage } from '../libraries/token-storage';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * 앱 초기화 시 localStorage에서 Access Token을 복원하는 Provider
 * 토큰 복원 작업이 완료되면 isLoaded를 true로 설정합니다.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  const { setAccessToken, setLoaded } = useAuthStore();

  useEffect(() => {
    // 앱 시작 시 localStorage에서 Access Token 복원
    const storedAccessToken = tokenStorage.getAccessToken();

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    // 토큰 복원 작업 완료
    setLoaded(true);
  }, [setAccessToken, setLoaded]);

  return <>{children}</>;
}
