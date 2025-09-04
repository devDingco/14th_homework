"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  uri: "http://main-practice.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache()
});

export default function ApolloSetting(props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}