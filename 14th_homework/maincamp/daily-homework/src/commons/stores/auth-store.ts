import { create } from 'zustand';

interface AuthStore {
  accessToken: string;
  isLoaded: boolean; // 토큰 복원 작업 완료 여부
  setAccessToken: (accessToken: string) => void;
  setLoaded: (loaded: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  accessToken: '',
  isLoaded: false, // 초기값: 아직 로드되지 않음
  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },
  setLoaded: (loaded: boolean) => {
    set({ isLoaded: loaded });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ accessToken: '', isLoaded: true }); // 로그아웃 시에도 로드 완료 상태로 설정
  },
  isAuthenticated: () => {
    const { accessToken } = get();
    return !!accessToken;
  },
}));
