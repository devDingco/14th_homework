'use client';

import { useEffect, useMemo } from 'react';
import { HttpLink, ApolloLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { useAccessTokenStore } from '../stores/access-token-store';

interface IApolloSetting {
  children: React.ReactNode;
}

export default function ApiUploadProvider(props: IApolloSetting) {
  const { accessToken, setAccessToken } = useAccessTokenStore();

  useEffect(() => {
    const result = localStorage.getItem('accessToken');
    if (result) {
      setAccessToken(result);
    }
  }, [setAccessToken]);

  const client = useMemo(() => {
    const uploadLink = createUploadLink({
      uri: 'http://main-practice.codebootcamp.co.kr/graphql',
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });

    return new ApolloClient({
      link: ApolloLink.from([uploadLink]),
      cache: new InMemoryCache(),
    });
  }, [accessToken]);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
