'use client';

import { IProps } from '@/types';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const BaseUrl = 'http://main-example.codebootcamp.co.kr/graphql';

const client = new ApolloClient({
  uri: BaseUrl,
  cache: new InMemoryCache(),
});

export default function ApolloProviderWrapper({ children }: IProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
