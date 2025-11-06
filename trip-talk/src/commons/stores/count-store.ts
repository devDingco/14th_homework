"use client";

import { create } from "zustand";

interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const useAccessTokenStore = create<AccessTokenStore>((set) => {
  return {
    accessToken: "",
    setAccessToken: (로그인토큰: string) => {
      set(() => ({ accessToken: 로그인토큰 }));
    },
  };
});
