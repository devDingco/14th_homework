'use client';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

export default function ApiUploadProvider(props) {
  const { accessToken } = useAccessTokenStore();
  const uploadLink = createUploadLink({
    uri: 'http://main-practice.codebootcamp.co.kr/graphql',
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
