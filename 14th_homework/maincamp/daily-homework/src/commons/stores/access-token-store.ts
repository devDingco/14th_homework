import { create } from 'zustand';

interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (loginToken: string) => void;
}

export const useAccessTokenStore = create<AccessTokenStore>((set) => {
  return {
    accessToken: '',
    setAccessToken: (loginToken: string) => {
      set(() => ({ accessToken: loginToken }));
    },
  };
});
