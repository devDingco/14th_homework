'use client';

import { useCallback } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { tokenStorage } from '../libraries/token-storage';
import { refreshAccessToken } from '../libraries/token-refresh';

/**
 * Access Token을 사용하여 새로운 Access Token을 갱신하는 훅
 * restoreAccessToken mutation을 사용하여 현재 Access Token으로 새로운 Access Token을 발급받습니다.
 */
export const useTokenRefresh = () => {
  const { setAccessToken, logout } = useAuthStore();

  /**
   * 쿠키에 저장된 refreshToken을 사용하여 새로운 Access Token 갱신
   * @returns 성공 여부
   */
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      // restoreAccessToken은 쿠키의 refreshToken을 자동으로 사용
      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) {
        // 토큰 갱신 실패 시 로그아웃
        logout();
        return false;
      }

      // 새로운 Access Token 저장
      setAccessToken(newAccessToken);
      tokenStorage.setAccessToken(newAccessToken);

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  }, [setAccessToken, logout]);

  return { refreshToken };
};
