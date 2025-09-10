'use client';

import { loginApi, signUpApi, meApi } from '../apis/auth.api';
import { tokenStorage } from '../utils/token';
import { User, SignUpInput } from '../../_types/auth';

export async function login(email: string, password: string): Promise<string | null> {
  const token = await loginApi(email, password);
  if (token) {
    tokenStorage.set(token);
    // 로그인 성공 이벤트 발생
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('auth:changed', { 
        detail: { isLoggedIn: true } 
      }));
    }
  }
  return token;
}

export async function signUp(input: SignUpInput): Promise<User | null> {
  return signUpApi(input);
}

export async function me(): Promise<User | null> {
  return meApi();
}

export function logout(): void {
  tokenStorage.clear();
  // 로그아웃 이벤트 발생
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('auth:changed', { 
      detail: { isLoggedIn: false } 
    }));
  }
}