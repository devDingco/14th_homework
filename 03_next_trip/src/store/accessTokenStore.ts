import { create } from 'zustand';

type AccessTokenState = {
  accessToken: string | null;
  setAccessToken: (newAccessToken: string | null) => void;
};

export const useAccessTokenStore = create<AccessTokenState>((set) => ({
  accessToken: null,
  setAccessToken: (newAccessToken: string | null) =>
    set(() => ({ accessToken: newAccessToken })),
}));
