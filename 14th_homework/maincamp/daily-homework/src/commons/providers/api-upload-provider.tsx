'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  from,
  fromPromise,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloProvider } from '@apollo/client/react';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useAuthStore } from '../stores/auth-store';
import { useRouter } from 'next/navigation';
import { useTokenRefresh } from '../hooks/use-token-refresh';
import { tokenStorage } from '../libraries/token-storage';

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApiUploadProvider(props: IApolloSetting) {
  const { accessToken, setAccessToken, logout } = useAuthStore();
  const router = useRouter();
  const { refreshToken } = useTokenRefresh();
  const isRefreshing = useRef(false);

  useEffect(() => {
    const storedAccessToken = tokenStorage.getAccessToken();
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, [setAccessToken]);

  // 401 에러 감지 및 자동 처리 (Refresh Token으로 재시도)
  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError, operation, forward }) => {
        // 401 에러 확인
        const isUnauthorized =
          (graphQLErrors &&
            graphQLErrors.some(
              ({ message, extensions }) =>
                extensions?.code === 'UNAUTHENTICATED' || message.includes('Unauthorized')
            )) ||
          (networkError && 'statusCode' in networkError && networkError.statusCode === 401);

        if (isUnauthorized) {
          // 이미 갱신 중이면 무시
          if (isRefreshing.current) {
            return;
          }

          // 쿠키에 저장된 refreshToken을 사용하여 토큰 갱신 시도
          // restoreAccessToken은 쿠키의 refreshToken을 자동으로 사용합니다
          isRefreshing.current = true;

          return fromPromise(
            refreshToken()
              .then((success) => {
                if (success) {
                  // 갱신 성공 시 새로운 Access Token으로 요청 재시도
                  const newAccessToken = tokenStorage.getAccessToken();
                  if (newAccessToken) {
                    operation.setContext({
                      headers: {
                        ...operation.getContext().headers,
                        Authorization: `Bearer ${newAccessToken}`,
                      },
                    });
                    return newAccessToken;
                  }
                }
                // 갱신 실패 시 로그아웃
                logout();
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                  router.push('/login');
                }
                throw new Error('Token refresh failed');
              })
              .catch((error: unknown) => {
                isRefreshing.current = false;
                logout();
                if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                  router.push('/login');
                }
                throw error;
              })
          ).flatMap(() => {
            isRefreshing.current = false;
            return forward(operation);
          });
        }
      }),
    [logout, router, refreshToken]
  );

  const client = useMemo(() => {
    const uploadLink = createUploadLink({
      uri: 'https://main-practice.codebootcamp.co.kr/graphql',
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
