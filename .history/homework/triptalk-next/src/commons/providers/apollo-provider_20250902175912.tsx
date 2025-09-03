'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://main-practice.codebootcamp.co.kr/graphql',
  cache: new InMemoryCache(),
});

interface ApolloSettingProps {
  모든페이지: React.ReactNode;
}

export default function ApolloSetting(props: ApolloSettingProps) {
  return <ApolloProvider client={client}>{props.모든페이지}</ApolloProvider>;
}
