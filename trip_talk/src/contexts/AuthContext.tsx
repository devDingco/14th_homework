'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/graphql';
import { tokenStorage } from '@/lib/apollo/auth';
import { useApolloClient } from '@apollo/client';
import { GET_USER_LOGGED_IN } from '@/graphql/queries';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const apolloClient = useApolloClient();

  // Hydration-safe: 서버와 클라이언트 동일한 초기값
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // 클라이언트 사이드에서만 인증 상태 초기화
  useEffect(() => {
    const initializeAuth = () => {
      // Hydration 완료 표시
      setIsHydrated(true);

      const hasToken = tokenStorage.hasToken();
      const savedUserInfo = localStorage.getItem('userInfo');

      console.log('🔄 클라이언트 인증 상태 초기화:', { hasToken, hasSavedInfo: !!savedUserInfo });

      if (!hasToken) {
        // 토큰이 없으면 로그아웃 상태
        console.log('❌ 토큰 없음 - 로그아웃 상태');
        setUser(null);
        localStorage.removeItem('userInfo');
        setIsLoading(false);
        return;
      }

      if (savedUserInfo) {
        try {
          const parsedUser = JSON.parse(savedUserInfo);
          console.log('✅ 저장된 사용자 정보 복원:', parsedUser.email);
          setUser(parsedUser);
          setIsLoading(false);
        } catch (error) {
          console.error('저장된 사용자 정보 파싱 실패:', error);
          localStorage.removeItem('userInfo');
          setUser(null);
          setIsLoading(false);
        }
      } else {
        // 토큰은 있지만 저장된 정보가 없음
        console.log('🔄 토큰 있음, 저장된 정보 없음');
        setUser(null);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (token: string) => {
    setIsLoading(true);

    // 토큰 저장
    tokenStorage.setToken(token, true);

    try {
      // Apollo Client로 직접 사용자 정보 가져오기
      const result = await apolloClient.query({
        query: GET_USER_LOGGED_IN,
        fetchPolicy: 'network-only', // 캐시 무시하고 서버에서 가져오기
      });

      if (result.data?.fetchUserLoggedIn) {
        console.log('🔄 로그인 후 사용자 정보 가져오기 성공:', result.data.fetchUserLoggedIn);
        setUser(result.data.fetchUserLoggedIn);
        localStorage.setItem('userInfo', JSON.stringify(result.data.fetchUserLoggedIn));
      }
    } catch (error) {
      console.error('로그인 후 사용자 정보 가져오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // 토큰 및 사용자 정보 제거
    tokenStorage.removeToken();
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsLoading(false);
  };

  const refreshUserInfo = async () => {
    if (!tokenStorage.hasToken()) return;

    setIsLoading(true);
    try {
      const result = await apolloClient.query({
        query: GET_USER_LOGGED_IN,
        fetchPolicy: 'network-only',
      });

      if (result.data?.fetchUserLoggedIn) {
        setUser(result.data.fetchUserLoggedIn);
        localStorage.setItem('userInfo', JSON.stringify(result.data.fetchUserLoggedIn));
      }
    } catch (error) {
      console.error('사용자 정보 새로고침 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && tokenStorage.hasToken(),
    isLoading,
    isHydrated,
    login,
    logout,
    refreshUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// AuthContext 사용을 위한 커스텀 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
