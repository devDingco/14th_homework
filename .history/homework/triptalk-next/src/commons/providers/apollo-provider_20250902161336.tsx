'use client';

import {
  ApolloClient,
  ApolloProvider,
  ApolloCache,
  InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://main-practice.codebootcamp.co.kr/graphql',
  cache: new InMemoryCache(),
});
