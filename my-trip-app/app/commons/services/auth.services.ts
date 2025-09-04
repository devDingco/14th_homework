'use client';

import { loginApi, signUpApi, meApi } from '../apis/auth.api';
import { tokenStorage } from '../utils/token';

export async function login(email: string, password: string) {
  const token = await loginApi(email, password);
  if (token) tokenStorage.set(token);
  return token;
}

export async function signUp(input: { email: string; name: string; password: string }) {
  return signUpApi(input);
}

export async function me() {
  return meApi();
}

export function logout() {
  tokenStorage.clear();
}