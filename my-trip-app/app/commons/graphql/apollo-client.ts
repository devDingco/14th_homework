'use client';

import { ApolloClient, InMemoryCache, ApolloLink, from } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { NEXT_PUBLIC_GRAPHQL_ENDPOINT as ENDPOINT } from '../env';

if (!ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT가 설정되지 않았습니다.');
}

const uploadLink = createUploadLink({
  uri: ENDPOINT,
  credentials: 'include',
});

const authLink = new ApolloLink((operation, forward) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      operation.setContext(({ headers = {} }) => ({
        headers: { ...headers, Authorization: `Bearer ${token}` },
      }));
    }
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([authLink, uploadLink as unknown as ApolloLink]),
  cache: new InMemoryCache(),
});