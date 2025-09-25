import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessToken:"",
  setAccessToken: (로그인토큰: string) => set({ accessToken: 로그인토큰 }),
    }));