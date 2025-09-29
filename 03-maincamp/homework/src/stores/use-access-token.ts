import { create } from "zustand";

export const useAccessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (loginToken: string) => {
    localStorage.setItem("accessToken", loginToken); 
    set({ accessToken: loginToken });
  },
  clearAccessToken: () => {
    localStorage.removeItem("accessToken"); 
    set({ accessToken: "" });
  },
}));