// src/commons/settings/06-02-apollo-setting.tsx
"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: "http://main-example.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache(),
});

export default function ApolloSetting({ children }: IApolloSetting) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
