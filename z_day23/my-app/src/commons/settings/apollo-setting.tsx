"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://main-practice.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache(),
});

interface IApolloSettingProps {
  children: React.ReactNode;
}

export default function ApolloSetting({ children }: IApolloSettingProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
