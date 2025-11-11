import { create } from "zustand";
import { ReactNode } from "react";

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

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => {
  return {
    isOpen: false,
    content: null,
    openModal: (content: ReactNode) => {
      set(() => ({ isOpen: true, content }));
    },
    closeModal: () => {
      set(() => ({ isOpen: false, content: null }));
    },
  };
});
