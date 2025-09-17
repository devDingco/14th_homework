'use client';

import { apolloClient } from '../graphql/apollo-client';
import { LOGIN_MUTATION, CREATE_USER_MUTATION } from '../graphql/mutations/auth';
import { ME_QUERY } from '../graphql/queries/auth';
import { User, LoginInput, SignUpInput } from '../../_types/auth';
import { tokenStorage } from '../utils/token';

export async function loginApi(email: string, password: string): Promise<string | null> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });
    return data?.loginUser?.accessToken ?? null;
  } catch (error: any) {
    console.error('로그인 API 에러:', error);
    throw new Error(error?.message || '로그인에 실패했습니다.');
  }
}

export async function signUpApi(input: SignUpInput): Promise<User | null> {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: input,
    });
    return data?.createUser ?? null;
  } catch (error: any) {
    console.error('회원가입 API 에러:', error);
    throw new Error(error?.message || '회원가입에 실패했습니다.');
  }
}

export async function meApi(): Promise<User | null> {
  try {
    // 클라이언트 사이드에서만 토큰 확인
    if (typeof window !== 'undefined') {
      const token = tokenStorage.get();
      if (!token) {
        console.log('🔓 토큰이 없어 사용자 정보 조회를 건너뜁니다.');
        return null;
      }
    }

    const { data } = await apolloClient.query({
      query: ME_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.fetchUserLoggedIn ?? null;
  } catch (error: any) {
    console.error('사용자 정보 조회 API 에러:', error);
    
    // 400, 401, 403 에러의 경우 토큰이 유효하지 않으므로 제거
    const statusCode = error?.networkError?.statusCode;
    if (statusCode === 400 || statusCode === 401 || statusCode === 403) {
      console.log('🔓 유효하지 않은 토큰으로 인한 에러, 토큰을 제거합니다.');
      if (typeof window !== 'undefined') {
        tokenStorage.clear();
      }
    }
    
    // 인증 에러의 경우 null을 반환하여 로그아웃 상태로 처리
    return null;
  }
}