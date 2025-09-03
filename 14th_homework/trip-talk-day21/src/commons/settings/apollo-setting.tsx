"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://main-practice.codebootcamp.co.kr/graphql",
  cache: new InMemoryCache(),
});
interface Iprops {
  children: React.ReactNode;
}

export default function ApolloSetting(props: Iprops) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
