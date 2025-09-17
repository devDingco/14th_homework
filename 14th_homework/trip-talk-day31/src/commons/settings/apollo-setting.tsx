"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://main-practice.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache(),
});
interface Iprops {
  children: React.ReactNode;
}

export default function ApolloSetting({ children }: Iprops) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
