import { create } from 'zustand'

interface AccessTokenState {
    accessToken: string
    setAccessToken: (token: string) => void
  }

export const useAccessTokenStore = create<AccessTokenState>((set) => {

    return {
        accessToken: "",
        setAccessToken: ( token ) => {
            set(() => ({ accessToken: token }))
        }
    }
})

