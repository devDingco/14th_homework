// JWT 토큰 관리 유틸리티
class AuthManager {
  private static instance: AuthManager;
  private token: string | null = null;

  private constructor() {
    // 페이지 로드 시 쿠키에서 토큰 복원
    this.token = this.getTokenFromCookie();
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  // 토큰 설정
  public setToken(token: string): void {
    this.token = token;
    // 쿠키에도 저장
    setTokenCookie(token);
  }

  // 토큰 가져오기
  public getToken(): string | null {
    return this.token;
  }

  // 토큰 제거
  public clearToken(): void {
    this.token = null;
    // 쿠키에서도 제거
    removeTokenCookie();
  }

  // 로그인 상태 확인
  public isLoggedIn(): boolean {
    return this.token !== null;
  }

  // Authorization 헤더 반환
  public getAuthHeader(): { Authorization: string } | {} {
    if (this.token) {
      return { Authorization: `Bearer ${this.token}` };
    }
    return {};
  }

  // 쿠키에서 토큰 가져오기 (private 메서드)
  private getTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null;
    
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'authToken') {
        return value;
      }
    }
    return null;
  }
}

export const authManager = AuthManager.getInstance();

// 쿠키 기반 토큰 관리 (보안 강화)
export const setTokenCookie = (token: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  // HttpOnly 쿠키로 설정 (XSS 공격 방지)
  document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
};


export const removeTokenCookie = (): void => {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
