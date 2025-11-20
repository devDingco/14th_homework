/**
 * 토큰 저장소 관리 유틸리티
 * localStorage에 안전하게 토큰을 저장/조회합니다.
 */

const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  /**
   * Access Token 저장
   */
  setAccessToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },

  /**
   * Access Token 조회
   */
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Access Token 삭제
   */
  removeAccessToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },

  /**
   * 모든 토큰 삭제
   */
  clearTokens: (): void => {
    tokenStorage.removeAccessToken();
  },
};
