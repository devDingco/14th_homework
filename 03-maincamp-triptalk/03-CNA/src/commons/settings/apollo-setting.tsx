"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "http://main-practice.codebootcamp.co.kr/graphql", 
  cache: new InMemoryCache(),
});

export default function ApolloSetting({ children }: IApolloSetting) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}