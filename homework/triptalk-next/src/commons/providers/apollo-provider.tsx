'use client';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useAccessTokenStore } from '../stores/access-token-store';
import { useEffect, ReactNode } from 'react';

interface ApiHeaderProviderProps {
  children: ReactNode;
}

export default function ApiHeaderProvider(props: ApiHeaderProviderProps) {
  const { setAccessToken } = useAccessTokenStore();
  useEffect(() => {
    const result = localStorage.getItem('accessToken');

    setAccessToken(result ?? '');
  }, [setAccessToken]);

  // 프리렌더링 무시
  const { accessToken } = useAccessTokenStore();
  const uploadLink = createUploadLink({
    uri: 'http://main-practice.codebootcamp.co.kr/graphql',
    headers: accessToken
      ? {
          Authorization: `bearer ${accessToken}`,
        }
      : {},
  });

  const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
