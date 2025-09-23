"use client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
interface Iprops {
  children: React.ReactNode;
}

export default function ApolloUploadSetting({ children }: Iprops) {
  const uploadLink = createUploadLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
