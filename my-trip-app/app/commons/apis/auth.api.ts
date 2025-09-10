'use client';

import { apolloClient } from '../graphql/apollo-client';
import { LOGIN_MUTATION, CREATE_USER_MUTATION } from '../graphql/mutations/auth';
import { ME_QUERY } from '../graphql/queries/auth';
import { User, LoginInput, SignUpInput } from '../../_types/auth';

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
    const { data } = await apolloClient.query({
      query: ME_QUERY,
      fetchPolicy: 'network-only',
    });
    return data?.fetchUserLoggedIn ?? null;
  } catch (error: any) {
    console.error('사용자 정보 조회 API 에러:', error);
    // 인증 에러의 경우 null을 반환하여 로그아웃 상태로 처리
    return null;
  }
}