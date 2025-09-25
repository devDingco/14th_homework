import { create } from "zustand";

export const useAccessTokenStore = create((set) => {
  return {
    accessToken: "",
    setAccessToken: (loginToken) => {
      set(() => ({ accessToken: loginToken }));
    },
  };
});
