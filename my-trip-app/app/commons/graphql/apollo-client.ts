'use client';

import { ApolloClient, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { NEXT_PUBLIC_GRAPHQL_ENDPOINT as ENDPOINT } from '../env';
import { tokenStorage } from '../utils/token';

if (!ENDPOINT) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT가 설정되지 않았습니다.');
}

const uploadLink = createUploadLink({
  uri: ENDPOINT,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  fetch: (uri, options) => {
    console.log('🌐 GraphQL 요청:', { uri, options });
    return fetch(uri, options).catch(error => {
      console.error('🚨 Fetch 에러:', error);
      throw error;
    });
  },
});

const authLink = new ApolloLink((operation, forward) => {
  // 인증이 필요하지 않은 공개 쿼리들
  const publicQueries = [
    'fetchBoardsOfTheBest',
    'fetchBoards',
    'fetchBoardsCount',
    'fetchBoard',
    'fetchTravelproducts',
    'fetchTravelproductsOfTheBest',
    'fetchTravelproduct'
  ];
  
  const operationName = operation.operationName;
  const isPublicQuery = publicQueries.includes(operationName || '');
  const skipAuth = operation.getContext().skipAuth;
  
  // 공개 쿼리이거나 skipAuth가 true인 경우 토큰을 추가하지 않음
  if (typeof window !== 'undefined' && !isPublicQuery && !skipAuth) {
    const token = tokenStorage.get();
    if (token) {
      operation.setContext(({ headers = {} }) => ({
        headers: { ...headers, Authorization: `Bearer ${token}` },
      }));
    }
  }
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // 401 Unauthorized 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      tokenStorage.clear();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, uploadLink as unknown as ApolloLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fetchTravelproductsOfTheBest: {
            merge: false, // 기존 데이터를 덮어쓰기
          },
          fetchTravelproducts: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first',
    },
  },
});