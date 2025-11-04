import { create } from "zustand";

interface AccessTokenState {
  accessToken: string;
  setAccessToken: (loginToken: string) => void;
}

export const useAccessTokenStore = create<AccessTokenState>((set) => {
  return {
    accessToken: "",
    setAccessToken: (loginToken: string) => {
      set(() => ({ accessToken: loginToken }));
    },
  };
});
