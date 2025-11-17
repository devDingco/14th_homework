'use client';

import { useEffect, useMemo } from 'react';
import { HttpLink, ApolloLink, ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloProvider } from '@apollo/client/react';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useAccessTokenStore } from '../stores/access-token-store';
import { useRouter } from 'next/navigation';

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApiUploadProvider(props: IApolloSetting) {
  const { accessToken, setAccessToken, logout } = useAccessTokenStore();
  const router = useRouter();

  useEffect(() => {
    const result = localStorage.getItem('accessToken');
    if (result) {
      setAccessToken(result);
    }
  }, [setAccessToken]);

  // 401 에러 감지 및 자동 처리
  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(
            ({ message, extensions }: { message: string; extensions?: { code?: string } }) => {
              // 401 Unauthorized 에러 감지
              if (extensions?.code === 'UNAUTHENTICATED' || message.includes('Unauthorized')) {
                // 토큰 삭제
                logout();
                // 로그인 페이지로 리다이렉트 (현재 페이지가 로그인 페이지가 아닐 때만)
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                  router.push('/login');
                }
              }
            }
          );
        }

        // 네트워크 에러 중 401 상태 코드 감지
        if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
          logout();
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            router.push('/login');
          }
        }
      }),
    [logout, router]
  );

  const client = useMemo(() => {
    const uploadLink = createUploadLink({
      uri: 'http://main-practice.codebootcamp.co.kr/graphql',
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    return new ApolloClient({
      link: from([errorLink, uploadLink]),
      cache: new InMemoryCache(),
    });
  }, [accessToken, errorLink]);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
