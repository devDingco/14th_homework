"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://main-example.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache(),
});

interface ApolloSettingProps {
  children: React.ReactNode;
}

export default function ApolloSetting(props: ApolloSettingProps) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
