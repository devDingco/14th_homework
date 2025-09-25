import {create} from "zustand";

export const useAccessTokenStore = create((set)=>(
  {
    accessToken:"",
    setAccessToken: (loginToken) => set(()=>({accessToken:loginToken})),
  }
))