// 토큰 관리 유틸리티
export const tokenStorage = {
  // 토큰 저장
  setToken: (token: string, rememberMe: boolean = false) => {
    if (typeof window === 'undefined') return;

    if (rememberMe) {
      localStorage.setItem('accessToken', token);
    } else {
      sessionStorage.setItem('accessToken', token);
    }
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  },

  // 토큰 제거
  removeToken: () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
  },

  // 토큰 존재 여부 확인
  hasToken: (): boolean => {
    if (typeof window === 'undefined') return false;

    return !!(localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'));
  },
};

// JWT 토큰 디코딩 (페이로드만)
export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('토큰 디코딩 실패:', error);
    return null;
  }
};

// 토큰 만료 확인
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};
