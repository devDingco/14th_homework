'use client';

import { IProps } from '@/types';
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const BaseUrl = 'http://main-practice.codebootcamp.co.kr/graphql';

const uploadLink = createUploadLink({
  uri: BaseUrl,
});

const client = new ApolloClient({
  uri: BaseUrl,
  link: ApolloLink.from([uploadLink]),
  cache: new InMemoryCache(),
});

export default function ApolloProviderWrapper({ children }: IProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
