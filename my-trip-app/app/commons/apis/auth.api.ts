'use client';

import { apolloClient } from '../graphql/apollo-client';
import { LOGIN_MUTATION, CREATE_USER_MUTATION } from '../graphql/mutations/auth';
import { ME_QUERY } from '../graphql/queries/auth';

export async function loginApi(email: string, password: string) {
  const { data } = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { email, password },
  });
  return data?.loginUser?.accessToken ?? null;
}

export async function signUpApi(input: { email: string; name: string; password: string }) {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_USER_MUTATION,
    variables: input,
  });
  return data?.createUser ?? null;
}

export async function meApi() {
  const { data } = await apolloClient.query({
    query: ME_QUERY,
    fetchPolicy: 'network-only',
  });
  return data?.fetchUserLoggedIn ?? null;
}