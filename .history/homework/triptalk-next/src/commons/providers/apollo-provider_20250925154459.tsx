'use client';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useAccessTokenStore } from '../stores/access-token-store';
import { useEffect } from 'react';

export default function ApiHeaderProvider(props) {
  useEffect(() => {
    const result = localStorage.getItem('accessToken');

    setAccessToken(result ?? '');
  }, []);

  // 프리렌더링 무시
  const { accessToken, setAccessToken } = useAccessTokenStore();
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
