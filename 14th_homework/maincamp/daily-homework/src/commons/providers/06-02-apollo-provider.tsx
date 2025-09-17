'use client';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://main-practice.codebootcamp.co.kr/graphql',
  cache: new InMemoryCache(),
});

export default function ApolloSetting(props: { allPage: React.ReactNode }) {
  return <ApolloProvider client={client}>{props.allPage}</ApolloProvider>;
}
